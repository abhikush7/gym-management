'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Trainer } from '@/lib/types';
import { SPECIALIZATIONS } from '@/lib/utils/constants';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { classNames } from '@/lib/utils/helpers';

interface TrainerFormProps {
  initial?: Partial<Trainer>;
  onSubmit: (data: Partial<Trainer>) => Promise<void>;
  onCancel: () => void;
}

export default function TrainerForm({ initial, onSubmit, onCancel }: TrainerFormProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: initial?.name || '',
    email: initial?.email || '',
    phone: initial?.phone || '',
    experience: initial?.experience || 0,
    specialization: initial?.specialization || [] as string[],
    bio: initial?.bio || '',
    isActive: initial?.isActive ?? true,
  });

  const toggleSpec = (spec: string) => {
    setForm((f) => ({
      ...f,
      specialization: f.specialization.includes(spec)
        ? f.specialization.filter((s) => s !== spec)
        : [...f.specialization, spec],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await onSubmit({ ...form, assignedMembers: initial?.assignedMembers || [] });
      toast.success('Trainer saved!');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <Input label="Experience (years)" type="number" value={form.experience} onChange={(e) => setForm({ ...form, experience: Number(e.target.value) })} min={0} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-300 mb-2">Specializations</p>
        <div className="flex flex-wrap gap-2">
          {SPECIALIZATIONS.map((spec) => (
            <button
              key={spec}
              type="button"
              onClick={() => toggleSpec(spec)}
              className={classNames(
                'px-3 py-1 rounded-full text-xs border transition-all',
                form.specialization.includes(spec)
                  ? 'bg-red-500/20 border-red-500 text-red-400'
                  : 'border-[#1f1f1f] text-gray-500 hover:border-gray-500'
              )}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>
      <Textarea label="Bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={4} />
      <label className="flex items-center space-x-2 cursor-pointer">
        <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 accent-red-500" />
        <span className="text-sm text-gray-300">Active</span>
      </label>
      <div className="flex space-x-3 pt-2">
        <Button type="submit" isLoading={loading} className="flex-1">Save Trainer</Button>
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}
