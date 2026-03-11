'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Payment, User, MembershipPlan } from '@/lib/types';
import { memberService } from '@/lib/services/memberService';
import { planService } from '@/lib/services/planService';
import { paymentService } from '@/lib/services/paymentService';
import Select from '@/components/ui/Select';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface InvoiceFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function InvoiceForm({ onSuccess, onCancel }: InvoiceFormProps) {
  const [members, setMembers] = useState<User[]>([]);
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    userId: '',
    userName: '',
    planId: '',
    planName: '',
    amount: 0,
    dueDate: new Date().toISOString().slice(0, 10),
    status: 'pending' as Payment['status'],
    method: '' as Payment['method'],
  });

  useEffect(() => {
    Promise.all([memberService.getAll(), planService.getActive()])
      .then(([m, p]) => { setMembers(m); setPlans(p); });
  }, []);

  const handleMemberChange = (uid: string) => {
    const m = members.find((x) => x.uid === uid);
    setForm((f) => ({ ...f, userId: uid, userName: m?.displayName || '' }));
  };

  const handlePlanChange = (planId: string) => {
    const p = plans.find((x) => x.id === planId);
    setForm((f) => ({ ...f, planId, planName: p?.name || '', amount: p?.price || 0 }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await paymentService.create({
        ...form,
        invoiceNumber: paymentService.generateInvoiceNumber(),
        paidDate: form.status === 'paid' ? new Date().toISOString() : undefined,
        dueDate: new Date(form.dueDate).toISOString(),
      });
      toast.success('Invoice created!');
      onSuccess();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to create');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select
        label="Member"
        value={form.userId}
        onChange={(e) => handleMemberChange(e.target.value)}
        options={[{ value: '', label: 'Select member...' }, ...members.map((m) => ({ value: m.uid, label: m.displayName }))]}
        required
      />
      <Select
        label="Plan"
        value={form.planId}
        onChange={(e) => handlePlanChange(e.target.value)}
        options={[{ value: '', label: 'Select plan...' }, ...plans.map((p) => ({ value: p.id, label: `${p.name} - ₹${p.price}` }))]}
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <Input label="Amount (₹)" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })} min={0} required />
        <Input label="Due Date" type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} required />
      </div>
      <Select
        label="Status"
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value as Payment['status'] })}
        options={[
          { value: 'pending', label: 'Pending' },
          { value: 'paid', label: 'Paid' },
          { value: 'overdue', label: 'Overdue' },
        ]}
      />
      {form.status === 'paid' && (
        <Select
          label="Payment Method"
          value={form.method || ''}
          onChange={(e) => setForm({ ...form, method: e.target.value as Payment['method'] })}
          options={[
            { value: 'cash', label: 'Cash' },
            { value: 'card', label: 'Card' },
            { value: 'upi', label: 'UPI' },
            { value: 'bank_transfer', label: 'Bank Transfer' },
          ]}
        />
      )}
      <div className="flex space-x-3 pt-2">
        <Button type="submit" isLoading={loading} className="flex-1">Create Invoice</Button>
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}
