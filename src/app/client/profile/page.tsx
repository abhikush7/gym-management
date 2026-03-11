'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '@/lib/hooks/useAuth';
import { memberService } from '@/lib/services/memberService';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { getInitials } from '@/lib/utils/helpers';

export default function ClientProfilePage() {
  const { userData } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    displayName: userData?.displayName || '',
    phone: userData?.phone || '',
    address: userData?.address || '',
    emergencyContact: userData?.emergencyContact || '',
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData?.uid) return;
    try {
      setLoading(true);
      await memberService.update(userData.uid, form);
      toast.success('Profile updated!');
      setEditing(false);
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="font-display text-3xl font-black text-white uppercase">My Profile</h1>

      <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-8">
        <div className="flex items-center space-x-6 mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {userData?.displayName ? getInitials(userData.displayName) : 'U'}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{userData?.displayName}</h2>
            <p className="text-gray-400">{userData?.email}</p>
            <p className="text-[#00d4ff] text-sm capitalize mt-1">{userData?.role} Member</p>
          </div>
        </div>

        {editing ? (
          <form onSubmit={handleSave} className="space-y-4">
            <Input label="Full Name" value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} />
            <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <Input label="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            <Input label="Emergency Contact" value={form.emergencyContact} onChange={(e) => setForm({ ...form, emergencyContact: e.target.value })} />
            <div className="flex space-x-3">
              <Button type="submit" isLoading={loading}>Save Changes</Button>
              <Button type="button" variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            {[
              { label: 'Phone', value: userData?.phone },
              { label: 'Address', value: userData?.address },
              { label: 'Emergency Contact', value: userData?.emergencyContact },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-gray-500 text-sm">{item.label}</p>
                <p className="text-white">{item.value || '—'}</p>
              </div>
            ))}
            <Button onClick={() => setEditing(true)} variant="secondary">Edit Profile</Button>
          </div>
        )}
      </div>
    </div>
  );
}
