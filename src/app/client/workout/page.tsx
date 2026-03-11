'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { workoutService } from '@/lib/services/workoutService';
import { WorkoutPlan } from '@/lib/types';
import Loader from '@/components/ui/Loader';

export default function WorkoutPage() {
  const { userData } = useAuth();
  const [workouts, setWorkouts] = useState<WorkoutPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userData?.uid) {
      workoutService.getByUser(userData.uid)
        .then(setWorkouts)
        .finally(() => setLoading(false));
    }
  }, [userData?.uid]);

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-black text-white uppercase">My Workout Plan</h1>

      {workouts.length === 0 ? (
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-12 text-center">
          <div className="text-6xl mb-4">💪</div>
          <h2 className="text-white font-semibold text-lg mb-2">No Workout Plan Yet</h2>
          <p className="text-gray-400">Your trainer will assign a personalized workout plan for you.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {workouts.map((plan) => (
            <div key={plan.id} className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-semibold text-lg">{plan.title}</h2>
                <span className="bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20 px-3 py-1 rounded-full text-sm">
                  {plan.dayOfWeek}
                </span>
              </div>
              {plan.notes && <p className="text-gray-400 text-sm mb-4">{plan.notes}</p>}
              <div className="space-y-3">
                {plan.exercises.map((ex, i) => (
                  <div key={i} className="bg-[#0a0a0a] rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">{ex.name}</p>
                      <p className="text-gray-500 text-sm">{ex.sets} sets × {ex.reps} reps{ex.weight ? ` @ ${ex.weight}kg` : ''}</p>
                    </div>
                    {ex.restTime && (
                      <span className="text-gray-500 text-xs">Rest: {ex.restTime}s</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
