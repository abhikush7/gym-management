'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { paymentService } from '@/lib/services/paymentService';
import { Payment } from '@/lib/types';
import Badge from '@/components/ui/Badge';
import Loader from '@/components/ui/Loader';
import { formatDate, formatCurrency } from '@/lib/utils/helpers';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function InvoiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    paymentService.getAll()
      .then((all) => {
        setPayments(all.filter((p) => p.id === id));
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loader />;
  const payment = payments[0];
  if (!payment) return <div className="text-gray-400">Invoice not found</div>;

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-black text-white uppercase">Invoice Detail</h1>
        <Link href="/admin/billing">
          <Button variant="ghost">← Back</Button>
        </Link>
      </div>

      <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-8 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-400 text-sm">Invoice Number</p>
            <p className="text-white text-xl font-bold">{payment.invoiceNumber}</p>
          </div>
          <Badge
            text={payment.status}
            variant={payment.status === 'paid' ? 'success' : payment.status === 'overdue' ? 'danger' : 'warning'}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          {[
            { label: 'Member', value: payment.userName },
            { label: 'Plan', value: payment.planName },
            { label: 'Amount', value: formatCurrency(payment.amount) },
            { label: 'Due Date', value: formatDate(payment.dueDate) },
            { label: 'Paid Date', value: payment.paidDate ? formatDate(payment.paidDate) : '—' },
            { label: 'Method', value: payment.method || '—' },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-gray-500">{item.label}</p>
              <p className="text-white font-medium">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
