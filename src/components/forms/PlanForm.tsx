'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { MembershipPlan } from '@/lib/types';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';

interface PlanFormProps {
  initial?: Partial<MembershipPlan>;
  onSubmit: (data: Partial<MembershipPlan>) => Promise<void>;
  onCancel: () => void;
}

export default function PlanForm({ initial, onSubmit, onCancel }: PlanFormProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: initial?.name || '',
    description: initial?.description || '',
    price: initial?.price || 0,
    duration: initial?.duration || 1,
    features: initial?.features?.join('\n') || '',
    isPopular: initial?.isPopular || false,
    isActive: initial?.isActive ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await onSubmit({
        ...form,
        features: form.features.split('\n').filter((f) => f.trim()),
      });
      toast.success('Plan saved!');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Plan Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      <Textarea label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
      <div className="grid grid-cols-2 gap-4">
        <Input label="Price (₹)" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} min={0} required />
        <Input label="Duration (months)" type="number" value={form.duration} onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })} min={1} required />
      </div>
      <Textarea
        label="Features (one per line)"
        value={form.features}
        onChange={(e) => setForm({ ...form, features: e.target.value })}
        rows={5}
        placeholder="Unlimited access&#10;Personal trainer&#10;Nutrition plan"
      />
      <div className="flex space-x-6">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input type="checkbox" checked={form.isPopular} onChange={(e) => setForm({ ...form, isPopular: e.target.checked })} className="w-4 h-4 accent-red-500" />
          <span className="text-sm text-gray-300">Mark as Popular</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 accent-red-500" />
          <span className="text-sm text-gray-300">Active</span>
        </label>
      </div>
      <div className="flex space-x-3 pt-2">
        <Button type="submit" isLoading={loading} className="flex-1">Save Plan</Button>
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}
