'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import dynamicImport from 'next/dynamic';
import { useAuth } from '@/lib/hooks/useAuth';
import { attendanceService } from '@/lib/services/attendanceService';
import { Attendance } from '@/lib/types';
import Loader from '@/components/ui/Loader';
import { formatDateTime } from '@/lib/utils/helpers';

const QRGenerator = dynamicImport(() => import('@/components/attendance/QRGenerator'), { ssr: false });

export default function ClientAttendancePage() {
  const { userData } = useAuth();
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userData?.uid) {
      attendanceService.getUserAttendance(userData.uid)
        .then(setAttendance)
        .finally(() => setLoading(false));
    }
  }, [userData?.uid]);

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-black text-white uppercase">Attendance</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-6">
          <h2 className="text-white font-semibold mb-4">My QR Code</h2>
          <QRGenerator />
        </div>

        <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-6">
          <h2 className="text-white font-semibold mb-4">Attendance History ({attendance.length} visits)</h2>
          {attendance.length === 0 ? (
            <p className="text-gray-500 text-sm">No attendance records yet</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {attendance.map((a) => (
                <div key={a.id} className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded-lg">
                  <div>
                    <p className="text-white text-sm">{a.date}</p>
                    <p className="text-gray-500 text-xs">In: {formatDateTime(a.checkIn)}</p>
                  </div>
                  <div className="text-right">
                    {a.checkOut && <p className="text-gray-500 text-xs">Out: {formatDateTime(a.checkOut)}</p>}
                    <span className="text-[#00d4ff] text-xs capitalize">{a.method}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
