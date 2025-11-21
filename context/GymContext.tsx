"use client";

import type React from "react";
import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { PREDEFINED_EXERCISES } from "@/lib/exercises-data";
import type {
  Exercise,
  ProgressData,
  Routine,
  WorkoutSession,
} from "@/lib/types";

interface GymContextType {
  // Ejercicios
  exercises: Exercise[];
  addCustomExercise: (exercise: Omit<Exercise, "id" | "isCustom">) => void;
  deleteCustomExercise: (id: string) => void;
  getExerciseById: (id: string) => Exercise | undefined;

  // Rutinas
  routines: Routine[];
  addRoutine: (
    routine: Omit<Routine, "id" | "createdAt" | "updatedAt">,
  ) => void;
  updateRoutine: (id: string, routine: Partial<Routine>) => void;
  deleteRoutine: (id: string) => void;
  getRoutineById: (id: string) => Routine | undefined;

  // Sesiones de entrenamiento
  workoutSessions: WorkoutSession[];
  activeSession: WorkoutSession | null;
  startWorkout: (routineId: string) => void;
  updateActiveSession: (session: Partial<WorkoutSession>) => void;
  completeWorkout: () => void;
  cancelWorkout: () => void;

  // Progreso
  getProgressForExercise: (exerciseId: string) => ProgressData | undefined;
}

const GymContext = createContext<GymContextType | undefined>(undefined);

export function GymProvider({ children }: { children: React.ReactNode }) {
  // Estado persistente
  const [customExercises, setCustomExercises] = useLocalStorage<Exercise[]>(
    "gym_custom_exercises",
    [],
  );
  const [routines, setRoutines] = useLocalStorage<Routine[]>(
    "gym_routines",
    [],
  );
  const [workoutSessions, setWorkoutSessions] = useLocalStorage<
    WorkoutSession[]
  >("gym_workout_sessions", []);

  // Estado temporal (no persistente)
  const [activeSession, setActiveSession] = useState<WorkoutSession | null>(
    null,
  );

  // Combinar ejercicios predefinidos con personalizados
  const exercises = [...PREDEFINED_EXERCISES, ...customExercises];

  // Funciones de ejercicios
  const addCustomExercise = (exercise: Omit<Exercise, "id" | "isCustom">) => {
    const newExercise: Exercise = {
      ...exercise,
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      isCustom: true,
    };
    setCustomExercises([...customExercises, newExercise]);
  };

  const deleteCustomExercise = (id: string) => {
    setCustomExercises(customExercises.filter((ex) => ex.id !== id));
  };

  const getExerciseById = (id: string): Exercise | undefined => {
    return exercises.find((ex) => ex.id === id);
  };

  // Funciones de rutinas
  const addRoutine = (
    routine: Omit<Routine, "id" | "createdAt" | "updatedAt">,
  ) => {
    const newRoutine: Routine = {
      ...routine,
      id: `routine-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setRoutines([...routines, newRoutine]);
  };

  const updateRoutine = (id: string, updates: Partial<Routine>) => {
    setRoutines(
      routines.map((r) =>
        r.id === id ? { ...r, ...updates, updatedAt: new Date() } : r,
      ),
    );
  };

  const deleteRoutine = (id: string) => {
    setRoutines(routines.filter((r) => r.id !== id));
  };

  const getRoutineById = (id: string): Routine | undefined => {
    return routines.find((r) => r.id === id);
  };

  // Funciones de sesiones de entrenamiento
  const startWorkout = (routineId: string) => {
    const routine = getRoutineById(routineId);
    if (!routine) return;

    const newSession: WorkoutSession = {
      id: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      routineId: routine.id,
      routineName: routine.name,
      date: new Date(),
      exercises: routine.exercises.map((re) => {
        const exercise = getExerciseById(re.exerciseId);
        return {
          exerciseId: re.exerciseId,
          exerciseName: exercise?.name || "Ejercicio desconocido",
          sets: re.sets.map((setTemplate) => ({
            ...setTemplate,
            completed: false,
          })),
        };
      }),
      duration: 0,
      completed: false,
    };

    setActiveSession(newSession);
  };

  const updateActiveSession = (updates: Partial<WorkoutSession>) => {
    if (!activeSession) return;
    setActiveSession({ ...activeSession, ...updates });
  };

  const completeWorkout = () => {
    if (!activeSession) return;

    const completedSession: WorkoutSession = {
      ...activeSession,
      completed: true,
    };

    setWorkoutSessions([...workoutSessions, completedSession]);
    setActiveSession(null);
  };

  const cancelWorkout = () => {
    setActiveSession(null);
  };

  // Función de progreso
  const getProgressForExercise = (
    exerciseId: string,
  ): ProgressData | undefined => {
    const exerciseSessions = workoutSessions
      .filter((session) => session.completed)
      .map((session) => {
        const exerciseData = session.exercises.find(
          (ex) => ex.exerciseId === exerciseId,
        );
        if (!exerciseData) return null;

        const completedSets = exerciseData.sets.filter((s) => s.completed);
        if (completedSets.length === 0) return null;

        const maxWeight = Math.max(
          ...completedSets.map((s) => s.actualWeight || 0),
        );
        const totalVolume = completedSets.reduce(
          (sum, s) => sum + (s.actualWeight || 0) * (s.actualReps || 0),
          0,
        );

        return {
          date: session.date,
          maxWeight,
          totalVolume,
        };
      })
      .filter((data) => data !== null);

    if (exerciseSessions.length === 0) return undefined;

    return {
      exerciseId,
      history: exerciseSessions,
    };
  };

  const value: GymContextType = {
    exercises,
    addCustomExercise,
    deleteCustomExercise,
    getExerciseById,
    routines,
    addRoutine,
    updateRoutine,
    deleteRoutine,
    getRoutineById,
    workoutSessions,
    activeSession,
    startWorkout,
    updateActiveSession,
    completeWorkout,
    cancelWorkout,
    getProgressForExercise,
  };

  return <GymContext.Provider value={value}>{children}</GymContext.Provider>;
}

export function useGym() {
  const context = useContext(GymContext);
  if (context === undefined) {
    throw new Error("useGym must be used within a GymProvider");
  }
  return context;
}
