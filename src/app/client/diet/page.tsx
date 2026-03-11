'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { dietService } from '@/lib/services/dietService';
import { DietPlan } from '@/lib/types';
import Loader from '@/components/ui/Loader';

export default function DietPage() {
  const { userData } = useAuth();
  const [plans, setPlans] = useState<DietPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userData?.uid) {
      dietService.getByUser(userData.uid)
        .then(setPlans)
        .finally(() => setLoading(false));
    }
  }, [userData?.uid]);

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-black text-white uppercase">Diet Plan</h1>

      {plans.length === 0 ? (
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-12 text-center">
          <div className="text-6xl mb-4">🥗</div>
          <h2 className="text-white font-semibold text-lg mb-2">No Diet Plan Yet</h2>
          <p className="text-gray-400">Your trainer will assign a personalized diet plan for you.</p>
        </div>
      ) : (
        plans.map((plan) => (
          <div key={plan.id} className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold text-lg">{plan.title}</h2>
              <span className="text-[#00d4ff] font-bold">{plan.totalCalories} kcal/day</span>
            </div>
            {plan.notes && <p className="text-gray-400 text-sm mb-4">{plan.notes}</p>}
            <div className="grid md:grid-cols-2 gap-4">
              {plan.meals.map((meal, i) => (
                <div key={i} className="bg-[#0a0a0a] rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <p className="text-white font-medium">{meal.name}</p>
                    <span className="text-gray-500 text-sm">{meal.time}</span>
                  </div>
                  <ul className="space-y-1 mb-3">
                    {meal.items.map((item, j) => (
                      <li key={j} className="text-gray-400 text-sm">• {item}</li>
                    ))}
                  </ul>
                  <div className="flex space-x-4 text-xs">
                    <span className="text-[#00d4ff]">{meal.calories} kcal</span>
                    <span className="text-green-400">{meal.protein}g protein</span>
                    <span className="text-yellow-400">{meal.carbs}g carbs</span>
                    <span className="text-red-400">{meal.fat}g fat</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
