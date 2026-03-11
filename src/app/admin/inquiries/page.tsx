'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { inquiryService } from '@/lib/services/inquiryService';
import { Inquiry } from '@/lib/types';
import Table from '@/components/ui/Table';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import { formatDate } from '@/lib/utils/helpers';

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const data = await inquiryService.getAll();
    setInquiries(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleStatusChange = async (id: string, status: Inquiry['status']) => {
    try {
      await inquiryService.updateStatus(id, status);
      toast.success('Status updated');
      load();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return;
    await inquiryService.delete(id);
    toast.success('Inquiry deleted');
    load();
  };

  if (loading) return <Loader />;

  const statusVariant = (status: string) => {
    if (status === 'converted') return 'success';
    if (status === 'closed') return 'default';
    if (status === 'contacted') return 'info';
    return 'warning';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-black text-white uppercase">Inquiries</h1>
        <p className="text-gray-400">{inquiries.length} total inquiries</p>
      </div>

      <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl">
        <Table<Inquiry>
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email' },
            { key: 'phone', label: 'Phone' },
            { key: 'message', label: 'Message', render: (v) => <span className="text-gray-400 text-xs line-clamp-1">{v as string}</span> },
            { key: 'createdAt', label: 'Date', render: (v) => formatDate(v as string) },
            {
              key: 'status',
              label: 'Status',
              render: (v, row) => (
                <select
                  value={row.status}
                  onChange={(e) => handleStatusChange(row.id, e.target.value as Inquiry['status'])}
                  className="bg-[#0a0a0a] border border-[#1f1f1f] rounded text-xs text-white px-2 py-1 focus:outline-none"
                  onClick={(e) => e.stopPropagation()}
                >
                  {['new', 'contacted', 'converted', 'closed'].map((s) => (
                    <option key={s} value={s} className="bg-[#111111]">{s}</option>
                  ))}
                </select>
              ),
            },
            {
              key: 'id',
              label: '',
              render: (_, row) => (
                <Button size="sm" variant="danger" onClick={() => handleDelete(row.id)}>Del</Button>
              ),
            },
          ]}
          data={inquiries}
          keyExtractor={(i) => i.id}
          emptyMessage="No inquiries"
        />
      </div>
    </div>
  );
}
