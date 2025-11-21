"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useGym } from "@/context/GymContext";

export default function Home() {
  const { routines, workoutSessions, activeSession } = useGym();

  const completedWorkouts = workoutSessions.filter((s) => s.completed).length;
  const recentSessions = workoutSessions
    .filter((s) => s.completed)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 pb-20">
      {/* Header */}
      <header className="mb-8 pt-4">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
          💪 GymTracker
        </h1>
        <p className="text-[var(--foreground)] opacity-70">
          Tu rutina de gimnasio personalizada
        </p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card className="text-center">
          <div className="text-3xl font-bold text-[var(--primary)]">
            {routines.length}
          </div>
          <div className="text-sm text-[var(--foreground)] opacity-70 mt-1">
            Rutinas
          </div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-[var(--success)]">
            {completedWorkouts}
          </div>
          <div className="text-sm text-[var(--foreground)] opacity-70 mt-1">
            Entrenamientos
          </div>
        </Card>
      </div>

      {/* Active Workout Alert */}
      {activeSession && (
        <Card className="mb-6 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] border-none">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold mb-1">
                Entrenamiento Activo
              </h3>
              <p className="text-white/90 text-sm">
                {activeSession.routineName}
              </p>
            </div>
            <Link href={`/workout/${activeSession.routineId}`}>
              <Button
                variant="ghost"
                className="bg-white/20 text-white border-white/30"
              >
                Continuar →
              </Button>
            </Link>
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
          Acciones Rápidas
        </h2>
        <div className="grid grid-cols-1 gap-3">
          <Link href="/routines">
            <Card hoverable className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[var(--primary)] flex items-center justify-center text-2xl">
                📋
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[var(--foreground)]">
                  Mis Rutinas
                </h3>
                <p className="text-sm text-[var(--foreground)] opacity-70">
                  Ver y gestionar rutinas
                </p>
              </div>
              <span className="text-[var(--foreground)] opacity-50">→</span>
            </Card>
          </Link>

          <Link href="/history">
            <Card hoverable className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center text-2xl">
                📊
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[var(--foreground)]">
                  Historial
                </h3>
                <p className="text-sm text-[var(--foreground)] opacity-70">
                  Ver progreso y estadísticas
                </p>
              </div>
              <span className="text-[var(--foreground)] opacity-50">→</span>
            </Card>
          </Link>
        </div>
      </div>

      {/* Recent Workouts */}
      {recentSessions.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
            Entrenamientos Recientes
          </h2>
          <div className="space-y-3">
            {recentSessions.map((session) => (
              <Card
                key={session.id}
                className="flex items-center justify-between"
              >
                <div>
                  <h3 className="font-medium text-[var(--foreground)]">
                    {session.routineName}
                  </h3>
                  <p className="text-sm text-[var(--foreground)] opacity-70">
                    {new Date(session.date).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    • {session.duration} min
                  </p>
                </div>
                <div className="text-2xl">✅</div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {routines.length === 0 && (
        <Card className="text-center py-12">
          <div className="text-6xl mb-4">🏋️</div>
          <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
            ¡Comienza tu viaje fitness!
          </h3>
          <p className="text-[var(--foreground)] opacity-70 mb-6">
            Crea tu primera rutina para empezar a entrenar
          </p>
          <Link href="/routines">
            <Button>Crear Rutina</Button>
          </Link>
        </Card>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[var(--card-bg)] border-t border-[var(--border)] px-4 py-3 safe-area-inset-bottom">
        <div className="flex justify-around items-center max-w-lg mx-auto">
          <Link
            href="/"
            className="flex flex-col items-center gap-1 text-[var(--primary)]"
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
