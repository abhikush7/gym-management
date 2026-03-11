'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { paymentService } from '@/lib/services/paymentService';
import { Payment } from '@/lib/types';
import Table from '@/components/ui/Table';
import Badge from '@/components/ui/Badge';
import Loader from '@/components/ui/Loader';
import { formatDate, formatCurrency } from '@/lib/utils/helpers';

export default function ClientPaymentsPage() {
  const { userData } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userData?.uid) {
      paymentService.getByUser(userData.uid)
        .then(setPayments)
        .finally(() => setLoading(false));
    }
  }, [userData?.uid]);

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-black text-white uppercase">Payment History</h1>
      <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl">
        <Table<Payment>
          columns={[
            { key: 'invoiceNumber', label: 'Invoice' },
            { key: 'planName', label: 'Plan' },
            { key: 'amount', label: 'Amount', render: (v) => formatCurrency(v as number) },
            { key: 'dueDate', label: 'Due', render: (v) => formatDate(v as string) },
            { key: 'paidDate', label: 'Paid On', render: (v) => v ? formatDate(v as string) : '—' },
            { key: 'method', label: 'Method', render: (v) => (v as string)?.toUpperCase() || '—' },
            {
              key: 'status', label: 'Status',
              render: (v) => <Badge text={v as string} variant={v === 'paid' ? 'success' : v === 'overdue' ? 'danger' : 'warning'} />,
            },
          ]}
          data={payments}
          keyExtractor={(p) => p.id}
          emptyMessage="No payments found"
        />
      </div>
    </div>
  );
}
