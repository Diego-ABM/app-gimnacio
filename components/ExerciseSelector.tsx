"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { useGym } from "@/context/GymContext";
import {
  getExercisesByMuscleGroup,
  PREDEFINED_EXERCISES,
  searchExercises,
} from "@/lib/exercises-data";
import type { MuscleGroup } from "@/lib/types";

interface ExerciseSelectorProps {
  onSelectExercise: (exerciseId: string) => void;
}

const MUSCLE_GROUPS: { value: MuscleGroup; label: string; emoji: string }[] = [
  { value: "pecho", label: "Pecho", emoji: "💪" },
  { value: "espalda", label: "Espalda", emoji: "🦾" },
  { value: "piernas", label: "Piernas", emoji: "🦵" },
  { value: "hombros", label: "Hombros", emoji: "🏋️" },
  { value: "brazos", label: "Brazos", emoji: "💪" },
  { value: "abdomen", label: "Abdomen", emoji: "🔥" },
  { value: "cardio", label: "Cardio", emoji: "🏃" },
  { value: "otro", label: "Otro", emoji: "⚡" },
];

export function ExerciseSelector({ onSelectExercise }: ExerciseSelectorProps) {
  const { exercises: customExercises } = useGym();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMuscleGroup, setSelectedMuscleGroup] =
    useState<MuscleGroup | null>(null);

  const allExercises = [...PREDEFINED_EXERCISES, ...customExercises];

  const filteredExercises = searchQuery
    ? searchExercises(searchQuery, customExercises)
    : selectedMuscleGroup
      ? getExercisesByMuscleGroup(selectedMuscleGroup, customExercises)
      : allExercises;

  return (
    <div className="space-y-4">
      {/* Search */}
      <Input
        placeholder="Buscar ejercicio..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setSelectedMuscleGroup(null);
        }}
      />

      {/* Muscle Group Filters */}
      {!searchQuery && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            type="button"
            onClick={() => setSelectedMuscleGroup(null)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
              ${
                selectedMuscleGroup === null
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)]"
              }
            `}
          >
            Todos
          </button>
          {MUSCLE_GROUPS.map((group) => (
            <button
              type="button"
              key={group.value}
              onClick={() => setSelectedMuscleGroup(group.value)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                ${
                  selectedMuscleGroup === group.value
                    ? "bg-[var(--primary)] text-white"
                    : "bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)]"
                }
              `}
            >
              {group.emoji} {group.label}
            </button>
          ))}
        </div>
      )}

      {/* Exercise List */}
      <div className="max-h-96 overflow-y-auto space-y-2">
        {filteredExercises.length === 0 ? (
          <div className="text-center py-8 text-[var(--foreground)] opacity-70">
            No se encontraron ejercicios
          </div>
        ) : (
          filteredExercises.map((exercise) => (
            <button
              type="button"
              key={exercise.id}
              onClick={() => onSelectExercise(exercise.id)}
              className="w-full text-left p-3 rounded-lg bg-[var(--background)] border border-[var(--border)] hover:border-[var(--primary)] transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-[var(--foreground)]">
                    {exercise.name}
                  </h4>
                  <p className="text-sm text-[var(--foreground)] opacity-70">
                    {exercise.muscleGroup}
                    {exercise.equipment && ` • ${exercise.equipment}`}
                  </p>
                </div>
                {exercise.isCustom && (
                  <span className="text-xs bg-[var(--accent)] text-white px-2 py-1 rounded">
                    Personalizado
                  </span>
                )}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
