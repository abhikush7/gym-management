'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { usePlans } from '@/lib/hooks/usePlans';
import { planService } from '@/lib/services/planService';
import { MembershipPlan } from '@/lib/types';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import PlanForm from '@/components/forms/PlanForm';
import Badge from '@/components/ui/Badge';
import Loader from '@/components/ui/Loader';
import { formatCurrency } from '@/lib/utils/helpers';

export default function PlansAdminPage() {
  const { plans, loading, refetch } = usePlans();
  const [editPlan, setEditPlan] = useState<MembershipPlan | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const handleCreate = async (data: Partial<MembershipPlan>) => {
    await planService.create(data as Omit<MembershipPlan, 'id' | 'createdAt'>);
    toast.success('Plan created!');
    setShowCreate(false);
    refetch();
  };

  const handleUpdate = async (data: Partial<MembershipPlan>) => {
    if (!editPlan) return;
    await planService.update(editPlan.id, data);
    toast.success('Plan updated!');
    setEditPlan(null);
    refetch();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this plan?')) return;
    await planService.delete(id);
    toast.success('Plan deleted');
    refetch();
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-black text-white uppercase">Membership Plans</h1>
        <Button onClick={() => setShowCreate(true)}>+ New Plan</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-6">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-white font-bold text-lg">{plan.name}</h3>
              <div className="flex space-x-1">
                {plan.isPopular && <Badge text="Popular" variant="danger" />}
                <Badge text={plan.isActive ? 'Active' : 'Inactive'} variant={plan.isActive ? 'success' : 'default'} />
              </div>
            </div>
            <p className="text-3xl font-bold text-[#00d4ff] mb-1">{formatCurrency(plan.price)}</p>
            <p className="text-gray-500 text-sm mb-4">{plan.duration} month{plan.duration > 1 ? 's' : ''}</p>
            <ul className="space-y-1 mb-6">
              {plan.features.slice(0, 4).map((f, i) => (
                <li key={i} className="text-gray-400 text-sm">• {f}</li>
              ))}
            </ul>
            <div className="flex space-x-2">
              <Button size="sm" variant="secondary" className="flex-1" onClick={() => setEditPlan(plan)}>Edit</Button>
              <Button size="sm" variant="danger" onClick={() => handleDelete(plan.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Create Plan" size="lg">
        <PlanForm onSubmit={handleCreate} onCancel={() => setShowCreate(false)} />
      </Modal>

      <Modal isOpen={!!editPlan} onClose={() => setEditPlan(null)} title="Edit Plan" size="lg">
        {editPlan && <PlanForm initial={editPlan} onSubmit={handleUpdate} onCancel={() => setEditPlan(null)} />}
      </Modal>
    </div>
  );
}
