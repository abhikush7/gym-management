'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import toast from 'react-hot-toast';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function SettingsPage() {
  const [gymForm, setGymForm] = useState({ name: 'IronForge', phone: '+91 98765 43210', email: 'info@ironforge.fit', address: '123 Iron Street, Mumbai' });
  const [notifs, setNotifs] = useState({ expiryReminder: true, paymentReminder: true, newMember: true });

  const handleSaveGym = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Gym settings saved!');
  };

  return (
    <div className="max-w-2xl space-y-8">
      <h1 className="font-display text-3xl font-black text-white uppercase">Settings</h1>

      <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-6">
        <h2 className="text-white font-semibold mb-4">Gym Information</h2>
        <form onSubmit={handleSaveGym} className="space-y-4">
          <Input label="Gym Name" value={gymForm.name} onChange={(e) => setGymForm({ ...gymForm, name: e.target.value })} />
          <Input label="Phone" value={gymForm.phone} onChange={(e) => setGymForm({ ...gymForm, phone: e.target.value })} />
          <Input label="Email" type="email" value={gymForm.email} onChange={(e) => setGymForm({ ...gymForm, email: e.target.value })} />
          <Input label="Address" value={gymForm.address} onChange={(e) => setGymForm({ ...gymForm, address: e.target.value })} />
          <Button type="submit">Save Changes</Button>
        </form>
      </div>

      <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-6">
        <h2 className="text-white font-semibold mb-4">Notification Settings</h2>
        <div className="space-y-3">
          {[
            { key: 'expiryReminder', label: 'Membership expiry reminders (3 days before)' },
            { key: 'paymentReminder', label: 'Payment due reminders' },
            { key: 'newMember', label: 'New member registrations' },
          ].map((item) => (
            <label key={item.key} className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-300 text-sm">{item.label}</span>
              <input
                type="checkbox"
                checked={notifs[item.key as keyof typeof notifs]}
                onChange={(e) => setNotifs({ ...notifs, [item.key]: e.target.checked })}
                className="w-4 h-4 accent-red-500"
              />
            </label>
          ))}
        </div>
        <Button className="mt-4" onClick={() => toast.success('Notification settings saved!')}>Save</Button>
      </div>
    </div>
  );
}
