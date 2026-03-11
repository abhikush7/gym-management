'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { paymentService } from '@/lib/services/paymentService';
import { Payment } from '@/lib/types';
import Table from '@/components/ui/Table';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import InvoiceForm from '@/components/forms/InvoiceForm';
import Loader from '@/components/ui/Loader';
import { formatDate, formatCurrency } from '@/lib/utils/helpers';

type Tab = 'all' | 'paid' | 'pending' | 'overdue';

export default function BillingPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [showInvoice, setShowInvoice] = useState(false);

  const load = async () => {
    const data = await paymentService.getAll();
    setPayments(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = activeTab === 'all' ? payments : payments.filter((p) => p.status === activeTab);

  const handleMarkPaid = async (id: string) => {
    try {
      await paymentService.markPaid(id, 'cash');
      toast.success('Payment marked as paid');
      load();
    } catch {
      toast.error('Failed to update payment');
    }
  };

  if (loading) return <Loader />;

  const tabs: Tab[] = ['all', 'paid', 'pending', 'overdue'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-black text-white uppercase">Billing</h1>
          <p className="text-gray-400">{payments.length} total invoices</p>
        </div>
        <Button onClick={() => setShowInvoice(true)}>+ Create Invoice</Button>
      </div>

      <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl">
        <div className="flex space-x-1 p-2 border-b border-[#1f1f1f]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                activeTab === tab ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <Table<Payment>
          columns={[
            { key: 'invoiceNumber', label: 'Invoice #' },
            { key: 'userName', label: 'Member' },
            { key: 'planName', label: 'Plan' },
            { key: 'amount', label: 'Amount', render: (v) => formatCurrency(v as number) },
            { key: 'dueDate', label: 'Due Date', render: (v) => formatDate(v as string) },
            {
              key: 'status',
              label: 'Status',
              render: (v) => (
                <Badge
                  text={v as string}
                  variant={v === 'paid' ? 'success' : v === 'overdue' ? 'danger' : 'warning'}
                />
              ),
            },
            {
              key: 'id',
              label: 'Actions',
              render: (_, row) => row.status !== 'paid' ? (
                <Button size="sm" onClick={() => handleMarkPaid(row.id)}>Mark Paid</Button>
              ) : null,
            },
          ]}
          data={filtered}
          keyExtractor={(p) => p.id}
          emptyMessage="No payments found"
        />
      </div>

      <Modal isOpen={showInvoice} onClose={() => setShowInvoice(false)} title="Create Invoice" size="lg">
        <InvoiceForm onSuccess={() => { setShowInvoice(false); load(); }} onCancel={() => setShowInvoice(false)} />
      </Modal>
    </div>
  );
}
