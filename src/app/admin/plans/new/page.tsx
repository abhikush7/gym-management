'use client';

export const dynamic = 'force-dynamic';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { planService } from '@/lib/services/planService';
import { MembershipPlan } from '@/lib/types';
import PlanForm from '@/components/forms/PlanForm';

export default function NewPlanPage() {
  const router = useRouter();

  const handleSubmit = async (data: Partial<MembershipPlan>) => {
    await planService.create(data as Omit<MembershipPlan, 'id' | 'createdAt'>);
    toast.success('Plan created!');
    router.push('/admin/plans');
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-black text-white uppercase mb-6">Create New Plan</h1>
      <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-6">
        <PlanForm onSubmit={handleSubmit} onCancel={() => router.back()} />
      </div>
    </div>
  );
}
