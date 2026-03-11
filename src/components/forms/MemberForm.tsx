'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { planService } from '@/lib/services/planService';
import { trainerService } from '@/lib/services/trainerService';
import { MembershipPlan, Trainer, User } from '@/lib/types';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

interface MemberFormProps {
  initial?: Partial<User>;
  onSubmit: (data: Partial<User>) => Promise<void>;
  onCancel: () => void;
}

export default function MemberForm({ initial, onSubmit, onCancel }: MemberFormProps) {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    displayName: initial?.displayName || '',
    email: initial?.email || '',
    phone: initial?.phone || '',
    emergencyContact: initial?.emergencyContact || '',
    address: initial?.address || '',
    membershipPlanId: initial?.membershipPlanId || '',
    trainerId: initial?.trainerId || '',
    membershipStart: initial?.membershipStart?.slice(0, 10) || '',
    membershipExpiry: initial?.membershipExpiry?.slice(0, 10) || '',
    isActive: initial?.isActive ?? true,
  });

  useEffect(() => {
    Promise.all([planService.getActive(), trainerService.getActive()])
      .then(([p, t]) => { setPlans(p); setTrainers(t); });
  }, []);

  const handlePlanChange = (planId: string) => {
    const plan = plans.find((p) => p.id === planId);
    if (plan && form.membershipStart) {
      const start = new Date(form.membershipStart);
      start.setMonth(start.getMonth() + plan.duration);
      setForm({ ...form, membershipPlanId: planId, membershipExpiry: start.toISOString().slice(0, 10) });
    } else {
      setForm({ ...form, membershipPlanId: planId });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await onSubmit({
        ...form,
        membershipStart: form.membershipStart ? new Date(form.membershipStart).toISOString() : undefined,
        membershipExpiry: form.membershipExpiry ? new Date(form.membershipExpiry).toISOString() : undefined,
      });
      toast.success('Member saved!');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input label="Full Name" value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} required />
        <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <Input label="Emergency Contact" value={form.emergencyContact} onChange={(e) => setForm({ ...form, emergencyContact: e.target.value })} />
      </div>
      <Input label="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Membership Plan"
          value={form.membershipPlanId}
          onChange={(e) => handlePlanChange(e.target.value)}
          options={[{ value: '', label: 'Select plan...' }, ...plans.map((p) => ({ value: p.id, label: `${p.name} - ₹${p.price}` }))]}
        />
        <Select
          label="Trainer"
          value={form.trainerId}
          onChange={(e) => setForm({ ...form, trainerId: e.target.value })}
          options={[{ value: '', label: 'No trainer' }, ...trainers.map((t) => ({ value: t.id, label: t.name }))]}
        />
        <Input label="Start Date" type="date" value={form.membershipStart} onChange={(e) => setForm({ ...form, membershipStart: e.target.value })} />
        <Input label="Expiry Date" type="date" value={form.membershipExpiry} onChange={(e) => setForm({ ...form, membershipExpiry: e.target.value })} />
      </div>
      <label className="flex items-center space-x-2 cursor-pointer">
        <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 accent-red-500" />
        <span className="text-sm text-gray-300">Active Member</span>
      </label>
      <div className="flex space-x-3 pt-2">
        <Button type="submit" isLoading={loading} className="flex-1">Save Member</Button>
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}
