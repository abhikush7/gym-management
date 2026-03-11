'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import toast from 'react-hot-toast';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';

const sessionTypes = [
  { value: 'personal_training', label: 'Personal Training' },
  { value: 'group_class', label: 'Group Class' },
  { value: 'yoga', label: 'Yoga Session' },
  { value: 'nutrition', label: 'Nutrition Consultation' },
  { value: 'assessment', label: 'Fitness Assessment' },
];

export default function BookingsPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ date: '', time: '', type: 'personal_training', notes: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
    toast.success('Session booked successfully!');
  };

  if (submitted) {
    return (
      <div className="space-y-6">
        <h1 className="font-display text-3xl font-black text-white uppercase">Book Session</h1>
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-12 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-white font-semibold text-lg mb-2">Session Booked!</h2>
          <p className="text-gray-400 mb-6">Your session has been confirmed. We'll send a reminder before your session.</p>
          <Button onClick={() => setSubmitted(false)}>Book Another</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-black text-white uppercase">Book Session</h1>
      <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-6 max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select label="Session Type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} options={sessionTypes} />
          <Input label="Date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required min={new Date().toISOString().slice(0, 10)} />
          <Input label="Preferred Time" type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} required />
          <Textarea label="Notes (optional)" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} placeholder="Any specific requirements..." />
          <Button type="submit" isLoading={loading} className="w-full" size="lg">Book Session</Button>
        </form>
      </div>
    </div>
  );
}
