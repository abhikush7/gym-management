'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import StatsCard from '@/components/cards/StatsCard';
import ChartWrapper from '@/components/charts/ChartWrapper';
import RevenueChart from '@/components/charts/RevenueChart';
import MembershipChart from '@/components/charts/MembershipChart';
import AttendanceChart from '@/components/charts/AttendanceChart';
import { memberService } from '@/lib/services/memberService';
import { paymentService } from '@/lib/services/paymentService';
import { attendanceService } from '@/lib/services/attendanceService';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    todayAttendance: 0,
    monthRevenue: 0,
    pendingPayments: 0,
    expiredMembers: 0,
  });

  useEffect(() => {
    const load = async () => {
      const [all, active, today, pending, expired] = await Promise.all([
        memberService.getAll(),
        memberService.getActiveMembers(),
        attendanceService.getTodayAttendance(),
        paymentService.getPending(),
        memberService.getExpiredMembers(),
      ]);

      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
      const revenue = await paymentService.getRevenue(monthStart, now.toISOString());

      setStats({
        totalMembers: all.length,
        activeMembers: active.length,
        todayAttendance: today.length,
        monthRevenue: revenue,
        pendingPayments: pending.length,
        expiredMembers: expired.length,
      });
    };

    load().catch(console.error);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-black text-white uppercase mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back, Admin</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard title="Total Members" value={stats.totalMembers} icon="👥" color="blue" />
        <StatsCard title="Active Members" value={stats.activeMembers} icon="✅" color="green" />
        <StatsCard title="Today's Attendance" value={stats.todayAttendance} icon="📅" color="blue" />
        <StatsCard title="Monthly Revenue" value={`₹${stats.monthRevenue.toLocaleString('en-IN')}`} icon="💰" color="green" />
        <StatsCard title="Pending Payments" value={stats.pendingPayments} icon="⚠️" color="yellow" />
        <StatsCard title="Expired Members" value={stats.expiredMembers} icon="❌" color="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartWrapper title="Revenue (Last 6 Months)">
          <RevenueChart />
        </ChartWrapper>
        <ChartWrapper title="Membership Distribution">
          <MembershipChart />
        </ChartWrapper>
      </div>

      <ChartWrapper title="Daily Attendance (This Week)">
        <AttendanceChart />
      </ChartWrapper>
    </div>
  );
}
