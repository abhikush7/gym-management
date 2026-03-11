'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import dynamicImport from 'next/dynamic';
import toast from 'react-hot-toast';
import { useTodayAttendance } from '@/lib/hooks/useAttendance';
import { attendanceService } from '@/lib/services/attendanceService';
import { Attendance } from '@/lib/types';
import Table from '@/components/ui/Table';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Loader from '@/components/ui/Loader';
import { formatDateTime } from '@/lib/utils/helpers';

const QRScanner = dynamicImport(() => import('@/components/attendance/QRScanner'), { ssr: false });

export default function AttendancePage() {
  const { attendance, loading, refetch } = useTodayAttendance();
  const [showScanner, setShowScanner] = useState(false);
  const [manualId, setManualId] = useState('');
  const [manualName, setManualName] = useState('');

  const handleManualCheckIn = async () => {
    if (!manualId || !manualName) { toast.error('Fill in member details'); return; }
    try {
      await attendanceService.checkIn(manualId, manualName, 'manual');
      toast.success(`${manualName} checked in!`);
      setManualId(''); setManualName('');
      refetch();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Check-in failed');
    }
  };

  const handleCheckOut = async (id: string) => {
    try {
      await attendanceService.checkOut(id);
      toast.success('Checked out!');
      refetch();
    } catch {
      toast.error('Check-out failed');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-black text-white uppercase">Attendance</h1>
          <p className="text-gray-400">{attendance.length} check-ins today</p>
        </div>
        <Button onClick={() => setShowScanner(true)}>📷 QR Scanner</Button>
      </div>

      <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-6">
        <h2 className="text-white font-semibold mb-4">Manual Check-In</h2>
        <div className="flex space-x-3">
          <Input placeholder="Member ID" value={manualId} onChange={(e) => setManualId(e.target.value)} />
          <Input placeholder="Member Name" value={manualName} onChange={(e) => setManualName(e.target.value)} />
          <Button onClick={handleManualCheckIn}>Check In</Button>
        </div>
      </div>

      <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl">
        <div className="p-4 border-b border-[#1f1f1f]">
          <h2 className="text-white font-semibold">Today&apos;s Check-Ins</h2>
        </div>
        <Table<Attendance>
          columns={[
            { key: 'userName', label: 'Member' },
            { key: 'checkIn', label: 'Check In', render: (v) => formatDateTime(v as string) },
            { key: 'checkOut', label: 'Check Out', render: (v) => v ? formatDateTime(v as string) : '—' },
            { key: 'method', label: 'Method', render: (v) => <span className="capitalize">{v as string}</span> },
            {
              key: 'id',
              label: 'Actions',
              render: (_, row) => !row.checkOut ? (
                <Button size="sm" variant="secondary" onClick={() => handleCheckOut(row.id)}>Check Out</Button>
              ) : null,
            },
          ]}
          data={attendance}
          keyExtractor={(a) => a.id}
          emptyMessage="No check-ins today"
        />
      </div>

      <Modal isOpen={showScanner} onClose={() => setShowScanner(false)} title="QR Code Scanner">
        <QRScanner />
      </Modal>
    </div>
  );
}
