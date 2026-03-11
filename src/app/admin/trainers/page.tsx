'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { trainerService } from '@/lib/services/trainerService';
import { Trainer } from '@/lib/types';
import TrainerCard from '@/components/cards/TrainerCard';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import TrainerForm from '@/components/forms/TrainerForm';
import Loader from '@/components/ui/Loader';

export default function TrainersAdminPage() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [editTrainer, setEditTrainer] = useState<Trainer | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const load = async () => {
    const data = await trainerService.getAll();
    setTrainers(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (data: Partial<Trainer>) => {
    await trainerService.create(data as Omit<Trainer, 'id' | 'createdAt'>);
    toast.success('Trainer created!');
    setShowCreate(false);
    load();
  };

  const handleUpdate = async (data: Partial<Trainer>) => {
    if (!editTrainer) return;
    await trainerService.update(editTrainer.id, data);
    toast.success('Trainer updated!');
    setEditTrainer(null);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this trainer?')) return;
    await trainerService.delete(id);
    toast.success('Trainer deleted');
    load();
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-black text-white uppercase">Trainers</h1>
        <Button onClick={() => setShowCreate(true)}>+ Add Trainer</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.map((trainer) => (
          <div key={trainer.id} className="relative">
            <TrainerCard trainer={trainer} />
            <div className="absolute top-3 right-3 flex space-x-1">
              <Button size="sm" variant="secondary" onClick={() => setEditTrainer(trainer)}>Edit</Button>
              <Button size="sm" variant="danger" onClick={() => handleDelete(trainer.id)}>Del</Button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Add Trainer" size="lg">
        <TrainerForm onSubmit={handleCreate} onCancel={() => setShowCreate(false)} />
      </Modal>

      <Modal isOpen={!!editTrainer} onClose={() => setEditTrainer(null)} title="Edit Trainer" size="lg">
        {editTrainer && <TrainerForm initial={editTrainer} onSubmit={handleUpdate} onCancel={() => setEditTrainer(null)} />}
      </Modal>
    </div>
  );
}
