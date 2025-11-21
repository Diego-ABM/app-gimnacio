// Tipos para la aplicación de gimnasio

export type MuscleGroup =
  | "pecho"
  | "espalda"
  | "piernas"
  | "hombros"
  | "brazos"
  | "abdomen"
  | "cardio"
  | "otro";

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  equipment?: string;
  notes?: string;
  isCustom: boolean; // Para diferenciar ejercicios predefinidos vs personalizados
}

export interface SetTemplate {
  targetReps: number;
  targetWeight: number;
}

export interface Set extends SetTemplate {
  actualReps?: number;
  actualWeight?: number;
  completed: boolean;
}

export interface RoutineExercise {
  exerciseId: string;
  sets: SetTemplate[]; // Plantilla de series con objetivos
  restTime: number; // segundos entre series
  notes?: string;
}

export interface Routine {
  id: string;
  name: string;
  description?: string;
  exercises: RoutineExercise[];
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkoutSession {
  id: string;
  routineId: string;
  routineName: string;
  date: Date;
  exercises: {
    exerciseId: string;
    exerciseName: string;
    sets: Set[]; // Series completadas con valores reales
  }[];
  duration: number; // minutos
  completed: boolean;
  notes?: string;
}

export interface ProgressData {
  exerciseId: string;
  history: {
    date: Date;
    maxWeight: number;
    totalVolume: number; // peso × reps × series
  }[];
}
