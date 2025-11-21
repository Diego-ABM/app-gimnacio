"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { useGym } from "@/context/GymContext";

export default function HistoryPage() {
  const { workoutSessions } = useGym();

  const completedSessions = workoutSessions
    .filter((s) => s.completed)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const totalWorkouts = completedSessions.length;
  const totalMinutes = completedSessions.reduce(
    (sum, s) => sum + s.duration,
    0,
  );

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 pb-24">
      {/* Header */}
      <header className="mb-6 pt-4">
        <Link href="/" className="text-[var(--primary)] mb-4 block">
          ← Volver
        </Link>
        <h1 className="text-3xl font-bold text-[var(--foreground)]">
          Historial
        </h1>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card className="text-center">
          <div className="text-3xl font-bold text-[var(--success)]">
            {totalWorkouts}
          </div>
          <div className="text-sm text-[var(--foreground)] opacity-70 mt-1">
            Entrenamientos
          </div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-[var(--accent)]">
            {totalMinutes}
          </div>
          <div className="text-sm text-[var(--foreground)] opacity-70 mt-1">
            Minutos totales
          </div>
        </Card>
      </div>

      {/* Sessions List */}
      {completedSessions.length === 0 ? (
        <Card className="text-center py-12">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
            No hay entrenamientos aún
          </h3>
          <p className="text-[var(--foreground)] opacity-70">
            Completa tu primer entrenamiento para ver tu historial
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Entrenamientos Completados
          </h2>
          {completedSessions.map((session) => (
            <Card key={session.id}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[var(--foreground)]">
                    {session.routineName}
                  </h3>
                  <p className="text-sm text-[var(--foreground)] opacity-70">
                    {new Date(session.date).toLocaleDateString("es-ES", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="text-2xl">✅</div>
              </div>

              <div className="flex items-center gap-4 text-sm text-[var(--foreground)] opacity-70">
                <span>⏱️ {session.duration} min</span>
                <span>
                  💪 {session.exercises.length} ejercicio
                  {session.exercises.length !== 1 ? "s" : ""}
                </span>
              </div>

              {session.notes && (
                <div className="mt-3 p-3 bg-[var(--background)] rounded-lg">
                  <p className="text-sm text-[var(--foreground)] opacity-80">
                    📝 {session.notes}
                  </p>
                </div>
              )}

              {/* Exercise Summary */}
              <div className="mt-4 space-y-2">
                {session.exercises.map((ex, index) => {
                  const completedSets = ex.sets.filter((s) => s.completed);
                  return (
                    <div
                      key={`${ex.exerciseId}-${index}`}
                      className="flex items-center justify-between text-sm p-2 bg-[var(--background)] rounded"
                    >
                      <span className="text-[var(--foreground)]">
                        {ex.exerciseName}
                      </span>
                      <span className="text-[var(--foreground)] opacity-70">
                        {completedSets.length} serie
                        {completedSets.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      )}

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
            className="flex flex-col items-center gap-1 text-[var(--foreground)] opacity-60"
          >
            <span className="text-2xl">📋</span>
            <span className="text-xs font-medium">Rutinas</span>
          </Link>
          <Link
            href="/history"
            className="flex flex-col items-center gap-1 text-[var(--primary)]"
          >
            <span className="text-2xl">📊</span>
            <span className="text-xs font-medium">Historial</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
