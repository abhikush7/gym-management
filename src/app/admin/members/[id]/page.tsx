'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { memberService } from '@/lib/services/memberService';
import { paymentService } from '@/lib/services/paymentService';
import { attendanceService } from '@/lib/services/attendanceService';
import { User, Payment, Attendance } from '@/lib/types';
import Badge from '@/components/ui/Badge';
import Loader from '@/components/ui/Loader';
import { formatDate, formatDateTime, formatCurrency, daysRemaining, isExpired, getInitials } from '@/lib/utils/helpers';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function MemberDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [member, setMember] = useState<User | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      memberService.getById(id),
      paymentService.getByUser(id),
      attendanceService.getUserAttendance(id),
    ]).then(([m, p, a]) => {
      setMember(m);
      setPayments(p);
      setAttendance(a);
    }).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!member) return <div className="text-gray-400">Member not found</div>;

  const expired = member.membershipExpiry ? isExpired(member.membershipExpiry) : false;
  const days = member.membershipExpiry ? daysRemaining(member.membershipExpiry) : 0;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white text-xl font-bold">
            {getInitials(member.displayName)}
          </div>
          <div>
            <h1 className="font-display text-2xl font-black text-white">{member.displayName}</h1>
            <p className="text-gray-400">{member.email}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Link href={`/admin/members`}>
            <Button variant="ghost">← Back</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-5">
          <h3 className="text-gray-400 text-sm mb-3">Membership</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Status</span>
              <Badge text={member.isActive && !expired ? 'Active' : 'Inactive'} variant={member.isActive && !expired ? 'success' : 'danger'} />
            </div>
            {member.membershipStart && (
              <div className="flex justify-between">
                <span className="text-gray-500">Start</span>
                <span className="text-white">{formatDate(member.membershipStart)}</span>
              </div>
            )}
            {member.membershipExpiry && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-500">Expires</span>
                  <span className="text-white">{formatDate(member.membershipExpiry)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Days Left</span>
                  <span className={days < 0 ? 'text-red-400' : 'text-[#00d4ff]'}>
                    {days < 0 ? 'Expired' : `${days} days`}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-5">
          <h3 className="text-gray-400 text-sm mb-3">Contact</h3>
          <div className="space-y-2 text-sm">
            {member.phone && (
              <div><span className="text-gray-500">Phone:</span> <span className="text-white">{member.phone}</span></div>
            )}
            {member.address && (
              <div><span className="text-gray-500">Address:</span> <span className="text-white">{member.address}</span></div>
            )}
            {member.emergencyContact && (
              <div><span className="text-gray-500">Emergency:</span> <span className="text-white">{member.emergencyContact}</span></div>
            )}
          </div>
        </div>

        <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-5">
          <h3 className="text-gray-400 text-sm mb-3">Stats</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Total Visits</span>
              <span className="text-[#00d4ff] font-bold">{attendance.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Total Paid</span>
              <span className="text-green-400 font-bold">
                {formatCurrency(payments.filter((p) => p.status === 'paid').reduce((s, p) => s + p.amount, 0))}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Joined</span>
              <span className="text-white">{formatDate(member.joinDate)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-6">
        <h2 className="text-white font-semibold mb-4">Payment History</h2>
        {payments.length === 0 ? (
          <p className="text-gray-500 text-sm">No payments found</p>
        ) : (
          <div className="space-y-3">
            {payments.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded-lg">
                <div>
                  <p className="text-white text-sm font-medium">{p.invoiceNumber}</p>
                  <p className="text-gray-500 text-xs">{p.planName}</p>
                </div>
                <div className="text-right">
                  <p className="text-white text-sm font-medium">{formatCurrency(p.amount)}</p>
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
          <p className="text-gray-500 text-sm">No attendance records found</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {attendance.slice(0, 8).map((a) => (
              <div key={a.id} className="bg-[#0a0a0a] rounded-lg p-3 text-center">
                <p className="text-[#00d4ff] text-sm font-medium">{a.date}</p>
                <p className="text-gray-500 text-xs">{formatDateTime(a.checkIn).split(',')[1]}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
