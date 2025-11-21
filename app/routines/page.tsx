"use client";

import Link from "next/link";
import { useState } from "react";
import { ExerciseSelector } from "@/components/ExerciseSelector";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { useGym } from "@/context/GymContext";
import type { RoutineExercise } from "@/lib/types";

export default function RoutinesPage() {
  const { routines, addRoutine, deleteRoutine, startWorkout } = useGym();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newRoutine, setNewRoutine] = useState<{
    name: string;
    description: string;
    exercises: RoutineExercise[];
  }>({
    name: "",
    description: "",
    exercises: [],
  });

  const handleCreateRoutine = () => {
    if (!newRoutine.name.trim() || newRoutine.exercises.length === 0) {
      alert("Por favor completa el nombre y agrega al menos un ejercicio");
      return;
    }

    addRoutine(newRoutine);
    setIsCreateModalOpen(false);
    setNewRoutine({ name: "", description: "", exercises: [] });
  };

  const handleAddExercise = (exerciseId: string) => {
    const newExercise: RoutineExercise = {
      exerciseId,
      sets: [{ targetReps: 10, targetWeight: 0 }],
      restTime: 60,
    };
    setNewRoutine({
      ...newRoutine,
      exercises: [...newRoutine.exercises, newExercise],
    });
  };

  const handleStartWorkout = (routineId: string) => {
    startWorkout(routineId);
    window.location.href = `/workout/${routineId}`;
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 pb-24">
      {/* Header */}
      <header className="mb-6 pt-4">
        <div className="flex items-center justify-between mb-4">
          <Link href="/" className="text-[var(--primary)]">
            ← Volver
          </Link>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            + Nueva Rutina
          </Button>
        </div>
        <h1 className="text-3xl font-bold text-[var(--foreground)]">
          Mis Rutinas
        </h1>
      </header>

      {/* Routines List */}
      {routines.length === 0 ? (
        <Card className="text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
            No tienes rutinas aún
          </h3>
          <p className="text-[var(--foreground)] opacity-70 mb-6">
            Crea tu primera rutina para comenzar
          </p>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            Crear Rutina
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {routines.map((routine) => (
            <Card key={routine.id} className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[var(--foreground)]">
                    {routine.name}
                  </h3>
                  {routine.description && (
                    <p className="text-sm text-[var(--foreground)] opacity-70 mt-1">
                      {routine.description}
                    </p>
                  )}
                  <p className="text-sm text-[var(--foreground)] opacity-60 mt-2">
                    {routine.exercises.length} ejercicio
                    {routine.exercises.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`¿Eliminar la rutina "${routine.name}"?`)) {
                      deleteRoutine(routine.id);
                    }
                  }}
                  className="text-[var(--danger)] p-2"
                  aria-label="Eliminar rutina"
                >
                  🗑️
                </button>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleStartWorkout(routine.id)}
                  className="flex-1"
                >
                  Iniciar Entrenamiento
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create Routine Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Nueva Rutina"
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="Nombre de la rutina"
            placeholder="Ej: Rutina de Pecho y Tríceps"
            value={newRoutine.name}
            onChange={(e) =>
              setNewRoutine({ ...newRoutine, name: e.target.value })
            }
          />

          <div>
            <label
              htmlFor="routine-description"
              className="text-sm font-medium text-[var(--foreground)] block mb-1.5"
            >
              Descripción (opcional)
            </label>
            <textarea
              id="routine-description"
              className="w-full px-4 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all duration-200"
              placeholder="Ej: Rutina para desarrollar pecho y tríceps"
              rows={3}
              value={newRoutine.description}
              onChange={(e) =>
                setNewRoutine({ ...newRoutine, description: e.target.value })
              }
            />
          </div>

          <div>
            <p className="text-sm font-medium text-[var(--foreground)] block mb-2">
              Ejercicios ({newRoutine.exercises.length})
            </p>
            <ExerciseSelector onSelectExercise={handleAddExercise} />

            {newRoutine.exercises.length > 0 && (
              <div className="mt-4 space-y-2">
                {newRoutine.exercises.map((ex, index) => (
                  <div
                    key={`${ex.exerciseId}-${index}`}
                    className="flex items-center justify-between p-3 bg-[var(--background)] rounded-lg border border-[var(--border)]"
                  >
                    <span className="text-sm text-[var(--foreground)]">
                      Ejercicio {index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setNewRoutine({
                          ...newRoutine,
                          exercises: newRoutine.exercises.filter(
                            (_, i) => i !== index,
                          ),
                        });
                      }}
                      className="text-[var(--danger)] text-sm"
                      aria-label="Eliminar ejercicio"
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="ghost"
              onClick={() => setIsCreateModalOpen(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button onClick={handleCreateRoutine} className="flex-1">
              Crear Rutina
            </Button>
          </div>
        </div>
      </Modal>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[var(--card-bg)] border-t border-[var(--border)] px-4 py-3">
        <div className="flex justify-around items-center max-w-lg mx-auto">
          <Link
            href="/"
            className="flex flex-col items-center gap-1 text-[var(--foreground)] opacity-60"
          >
            <span className="text-2xl">🏠</span>
            <span className="text-xs font-medium">Inicio</span>
          </Link>
          <Link
            href="/routines"
            className="flex flex-col items-center gap-1 text-[var(--primary)]"
          >
            <span className="text-2xl">📋</span>
            <span className="text-xs font-medium">Rutinas</span>
          </Link>
          <Link
            href="/history"
            className="flex flex-col items-center gap-1 text-[var(--foreground)] opacity-60"
          >
            <span className="text-2xl">📊</span>
            <span className="text-xs font-medium">Historial</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
