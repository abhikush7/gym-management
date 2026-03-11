'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import StatsCard from '@/components/cards/StatsCard';
import { paymentService } from '@/lib/services/paymentService';
import { attendanceService } from '@/lib/services/attendanceService';
import { Payment, Attendance } from '@/lib/types';
import Badge from '@/components/ui/Badge';
import { formatDate, formatCurrency, daysRemaining, isExpired } from '@/lib/utils/helpers';

export default function ClientDashboard() {
  const { userData } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);

  useEffect(() => {
    if (userData?.uid) {
      Promise.all([
        paymentService.getByUser(userData.uid),
        attendanceService.getUserAttendance(userData.uid),
      ]).then(([p, a]) => { setPayments(p); setAttendance(a); });
    }
  }, [userData?.uid]);

  const expired = userData?.membershipExpiry ? isExpired(userData.membershipExpiry) : true;
  const days = userData?.membershipExpiry ? daysRemaining(userData.membershipExpiry) : 0;
  const pendingPayments = payments.filter((p) => p.status === 'pending' || p.status === 'overdue').length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-black text-white uppercase">
          Welcome, {userData?.displayName?.split(' ')[0]}! 👋
        </h1>
        <p className="text-gray-400">Here&apos;s your fitness overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Membership"
          value={userData?.isActive && !expired ? 'Active' : 'Inactive'}
          icon="🏋️"
          color={userData?.isActive && !expired ? 'green' : 'red'}
        />
        <StatsCard
          title="Days Remaining"
          value={days > 0 ? `${days} days` : 'Expired'}
          icon="📅"
          color={days > 7 ? 'blue' : 'yellow'}
        />
        <StatsCard title="Total Visits" value={attendance.length} icon="✅" color="green" />
        <StatsCard title="Pending Dues" value={pendingPayments} icon="💳" color={pendingPayments > 0 ? 'red' : 'green'} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-6">
          <h2 className="text-white font-semibold mb-4">Recent Payments</h2>
          {payments.length === 0 ? (
            <p className="text-gray-500 text-sm">No payments yet</p>
          ) : (
            <div className="space-y-3">
              {payments.slice(0, 4).map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded-lg">
                  <div>
                    <p className="text-white text-sm font-medium">{p.planName}</p>
                    <p className="text-gray-500 text-xs">{formatDate(p.dueDate)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white text-sm">{formatCurrency(p.amount)}</p>
                    <Badge text={p.status} variant={p.status === 'paid' ? 'success' : p.status === 'overdue' ? 'danger' : 'warning'} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-6">
          <h2 className="text-white font-semibold mb-4">Recent Attendance</h2>
          {attendance.length === 0 ? (
            <p className="text-gray-500 text-sm">No attendance records yet</p>
          ) : (
            <div className="space-y-2">
              {attendance.slice(0, 6).map((a) => (
                <div key={a.id} className="flex items-center justify-between p-2 bg-[#0a0a0a] rounded-lg">
                  <span className="text-white text-sm">{a.date}</span>
                  <Badge text="Checked In" variant="success" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
