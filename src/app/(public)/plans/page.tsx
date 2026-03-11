'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PricingCard from '@/components/cards/PricingCard';
import Loader from '@/components/ui/Loader';
import { planService } from '@/lib/services/planService';
import { MembershipPlan } from '@/lib/types';

const defaultPlans: Omit<MembershipPlan, 'id' | 'createdAt' | 'isActive'>[] = [
  {
    name: 'Starter',
    price: 999,
    duration: 1,
    description: 'Perfect for beginners',
    features: ['Gym floor access', 'Locker facility', 'Basic equipment', 'Fitness assessment'],
  },
  {
    name: 'Pro',
    price: 1999,
    duration: 1,
    description: 'Most popular choice',
    features: ['Everything in Starter', '4 PT sessions/month', 'Diet consultation', 'Sauna & pool', 'Group classes'],
    isPopular: true,
  },
  {
    name: 'Elite',
    price: 3999,
    duration: 1,
    description: 'Unlimited everything',
    features: ['Everything in Pro', 'Unlimited PT sessions', 'Custom workout plan', 'Nutrition plan', 'Priority booking', '24/7 access'],
  },
  {
    name: 'Annual Starter',
    price: 8999,
    duration: 12,
    description: 'Best value for beginners',
    features: ['Gym floor access', 'Locker facility', 'Basic equipment', 'Fitness assessment', 'Save 25%'],
  },
  {
    name: 'Annual Pro',
    price: 17999,
    duration: 12,
    description: 'Commit and save',
    features: ['Everything in Pro', 'Priority booking', '12-month access', 'Progress tracking', 'Save 25%'],
  },
  {
    name: 'Couple',
    price: 2999,
    duration: 1,
    description: 'Train together',
    features: ['2 memberships', 'Shared locker', 'Group classes', 'Couple yoga sessions', 'Nutrition consultation'],
  },
];

export default function PlansPage() {
  const [plans, setPlans] = useState<(Partial<MembershipPlan> & { name: string; price: number; duration: number; features: string[] })[]>(defaultPlans);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    planService.getActive()
      .then((data) => { if (data.length > 0) setPlans(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-16">
        <section className="py-24 px-4 text-center bg-[#0a0a0a] border-b border-[#1f1f1f]">
          <h1 className="font-display text-5xl md:text-7xl font-black uppercase text-white mb-4">
            MEMBERSHIP <span className="text-red-500">PLANS</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Flexible plans to match every goal and budget.
          </p>
        </section>

        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <Loader />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {plans.map((plan, i) => (
                  <PricingCard
                    key={(plan as MembershipPlan).id || i}
                    name={plan.name}
                    price={plan.price}
                    duration={plan.duration}
                    features={plan.features}
                    isPopular={plan.isPopular}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
