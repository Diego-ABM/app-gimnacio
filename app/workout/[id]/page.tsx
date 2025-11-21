"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useGym } from "@/context/GymContext";

export default function WorkoutPage() {
  const _params = useParams();
  const router = useRouter();
  const {
    activeSession,
    updateActiveSession,
    completeWorkout,
    cancelWorkout,
    getExerciseById,
  } = useGym();

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [restTimer, setRestTimer] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [startTime] = useState(Date.now());

  // Timer effect
  useEffect(() => {
    if (isResting && restTimer > 0) {
      const interval = setInterval(() => {
        setRestTimer((prev) => {
          if (prev <= 1) {
            setIsResting(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isResting, restTimer]);

  if (!activeSession) {
    return (
      <div className="min-h-screen bg-[var(--background)] p-4 flex items-center justify-center">
        <Card className="text-center py-12">
          <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
            No hay entrenamiento activo
          </h3>
          <Button onClick={() => router.push("/routines")}>Ver Rutinas</Button>
        </Card>
      </div>
    );
  }

  const currentExercise = activeSession.exercises[currentExerciseIndex];
  const currentSet = currentExercise?.sets[currentSetIndex];
  const exercise = getExerciseById(currentExercise?.exerciseId);

  const handleCompleteSet = (actualReps: number, actualWeight: number) => {
    if (!currentExercise || !currentSet) return;

    const updatedExercises = [...activeSession.exercises];
    updatedExercises[currentExerciseIndex].sets[currentSetIndex] = {
      ...currentSet,
      actualReps,
      actualWeight,
      completed: true,
    };

    updateActiveSession({ exercises: updatedExercises });

    // Move to next set or exercise
    if (currentSetIndex < currentExercise.sets.length - 1) {
      setCurrentSetIndex(currentSetIndex + 1);
      // Start rest timer
      const restTime = 60; // Default 60 seconds
      setRestTimer(restTime);
      setIsResting(true);
    } else if (currentExerciseIndex < activeSession.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCurrentSetIndex(0);
    }
  };

  const handleFinishWorkout = () => {
    const duration = Math.round((Date.now() - startTime) / 60000); // minutes
    updateActiveSession({ duration });
    completeWorkout();
    router.push("/history");
  };

  const handleCancelWorkout = () => {
    if (confirm("¿Seguro que quieres cancelar el entrenamiento?")) {
      cancelWorkout();
      router.push("/");
    }
  };

  const totalSets = activeSession.exercises.reduce(
    (sum, ex) => sum + ex.sets.length,
    0,
  );
  const completedSets = activeSession.exercises.reduce(
    (sum, ex) => sum + ex.sets.filter((s) => s.completed).length,
    0,
  );
  const progress = (completedSets / totalSets) * 100;

  const isLastSet =
    currentExerciseIndex === activeSession.exercises.length - 1 &&
    currentSetIndex === currentExercise.sets.length - 1;

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 pb-24">
      {/* Header */}
      <header className="mb-6 pt-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">
            {activeSession.routineName}
          </h1>
          <button
            type="button"
            onClick={handleCancelWorkout}
            className="text-[var(--danger)] text-sm"
          >
            Cancelar
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-2">
          <div className="flex justify-between text-sm text-[var(--foreground)] opacity-70 mb-1">
            <span>Progreso</span>
            <span>
              {completedSets}/{totalSets} series
            </span>
          </div>
          <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--success)] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      {/* Rest Timer */}
      {isResting && (
        <Card className="mb-6 bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] border-none text-center py-8">
          <h3 className="text-white text-xl font-semibold mb-2">Descanso</h3>
          <div className="text-6xl font-bold text-white mb-4">
            {Math.floor(restTimer / 60)}:
            {(restTimer % 60).toString().padStart(2, "0")}
          </div>
          <Button
            variant="ghost"
            onClick={() => {
              setIsResting(false);
              setRestTimer(0);
            }}
            className="bg-white/20 text-white border-white/30"
          >
            Saltar Descanso
          </Button>
        </Card>
      )}

      {/* Current Exercise */}
      {!isResting && currentExercise && currentSet && (
        <div className="space-y-6">
          <Card>
            <div className="text-center mb-6">
              <div className="text-sm text-[var(--foreground)] opacity-70 mb-2">
                Ejercicio {currentExerciseIndex + 1} de{" "}
                {activeSession.exercises.length}
              </div>
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-1">
                {exercise?.name || "Ejercicio"}
              </h2>
              <p className="text-[var(--foreground)] opacity-70">
                {exercise?.muscleGroup}
              </p>
            </div>

            <div className="text-center mb-6">
              <div className="text-sm text-[var(--foreground)] opacity-70 mb-2">
                Serie {currentSetIndex + 1} de {currentExercise.sets.length}
              </div>
              <div className="flex justify-center gap-8">
                <div>
                  <div className="text-3xl font-bold text-[var(--primary)]">
                    {currentSet.targetReps}
                  </div>
                  <div className="text-sm text-[var(--foreground)] opacity-70">
                    Repeticiones
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[var(--secondary)]">
                    {currentSet.targetWeight}
                  </div>
                  <div className="text-sm text-[var(--foreground)] opacity-70">
                    kg
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Input Form */}
          <SetInputForm
            targetReps={currentSet.targetReps}
            targetWeight={currentSet.targetWeight}
            onComplete={handleCompleteSet}
            isLastSet={isLastSet}
            onFinish={handleFinishWorkout}
          />

          {/* Exercise Progress */}
          <Card>
            <h3 className="font-semibold text-[var(--foreground)] mb-3">
              Series Completadas
            </h3>
            <div className="space-y-2">
              {currentExercise.sets.map((set, index) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: Sets order is stable and they don't have unique IDs
                  key={index}
                  className={`
                    flex items-center justify-between p-3 rounded-lg
                    ${
                      set.completed
                        ? "bg-[var(--success)]/10 border border-[var(--success)]"
                        : index === currentSetIndex
                          ? "bg-[var(--primary)]/10 border border-[var(--primary)]"
                          : "bg-[var(--background)] border border-[var(--border)]"
                    }
                  `}
                >
                  <span className="text-sm text-[var(--foreground)]">
                    Serie {index + 1}
                  </span>
                  {set.completed ? (
                    <span className="text-sm text-[var(--success)]">
                      ✓ {set.actualReps} reps × {set.actualWeight} kg
                    </span>
                  ) : index === currentSetIndex ? (
                    <span className="text-sm text-[var(--primary)]">
                      En progreso...
                    </span>
                  ) : (
                    <span className="text-sm text-[var(--foreground)] opacity-50">
                      Pendiente
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

function SetInputForm({
  targetReps,
  targetWeight,
  onComplete,
  isLastSet,
  onFinish,
}: {
  targetReps: number;
  targetWeight: number;
  onComplete: (reps: number, weight: number) => void;
  isLastSet: boolean;
  onFinish: () => void;
}) {
  const [reps, setReps] = useState(targetReps.toString());
  const [weight, setWeight] = useState(targetWeight.toString());

  const handleSubmit = () => {
    const repsNum = parseInt(reps, 10) || 0;
    const weightNum = parseFloat(weight) || 0;

    if (repsNum > 0) {
      onComplete(repsNum, weightNum);
      if (isLastSet) {
        onFinish();
      }
    } else {
      alert("Por favor ingresa el número de repeticiones");
    }
  };

  return (
    <Card>
      <h3 className="font-semibold text-[var(--foreground)] mb-4">
        Registrar Serie
      </h3>
      <div className="space-y-4">
        <Input
          type="number"
          label="Repeticiones realizadas"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          placeholder="0"
        />
        <Input
          type="number"
          step="0.5"
          label="Peso utilizado (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="0"
        />
        <Button onClick={handleSubmit} className="w-full">
          {isLastSet ? "Finalizar Entrenamiento" : "Completar Serie"}
        </Button>
      </div>
    </Card>
  );
}
