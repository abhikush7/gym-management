'use client';

export const dynamic = 'force-dynamic';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { trainerService } from '@/lib/services/trainerService';
import { Trainer } from '@/lib/types';
import TrainerForm from '@/components/forms/TrainerForm';

export default function NewTrainerPage() {
  const router = useRouter();

  const handleSubmit = async (data: Partial<Trainer>) => {
    await trainerService.create(data as Omit<Trainer, 'id' | 'createdAt'>);
    toast.success('Trainer created!');
    router.push('/admin/trainers');
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-black text-white uppercase mb-6">Add New Trainer</h1>
      <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-6">
        <TrainerForm onSubmit={handleSubmit} onCancel={() => router.back()} />
      </div>
    </div>
  );
}
