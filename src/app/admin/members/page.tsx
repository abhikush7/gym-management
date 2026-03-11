'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useMembers } from '@/lib/hooks/useMembers';
import { memberService } from '@/lib/services/memberService';
import { User } from '@/lib/types';
import Table from '@/components/ui/Table';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import MemberForm from '@/components/forms/MemberForm';
import Loader from '@/components/ui/Loader';
import { formatDate, isExpired, getInitials } from '@/lib/utils/helpers';

export default function MembersPage() {
  const { members, loading, refetch } = useMembers();
  const [search, setSearch] = useState('');
  const [editMember, setEditMember] = useState<User | null>(null);

  const filtered = members.filter((m) =>
    m.displayName.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this member?')) return;
    try {
      await memberService.delete(id);
      toast.success('Member deleted');
      refetch();
    } catch {
      toast.error('Failed to delete member');
    }
  };

  const handleUpdate = async (data: Partial<User>) => {
    if (!editMember) return;
    await memberService.update(editMember.uid, data);
    await refetch();
    setEditMember(null);
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-black text-white uppercase">Members</h1>
          <p className="text-gray-400">{members.length} total members</p>
        </div>
        <Link href="/admin/members/new">
          <Button>+ Add Member</Button>
        </Link>
      </div>

      <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl">
        <div className="p-4 border-b border-[#1f1f1f]">
          <input
            type="text"
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-xs bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]"
          />
        </div>
        <Table<User>
          columns={[
            {
              key: 'displayName',
              label: 'Member',
              render: (_, row) => (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center text-red-400 text-xs font-bold">
                    {getInitials(row.displayName)}
                  </div>
                  <div>
                    <p className="text-white font-medium">{row.displayName}</p>
                    <p className="text-gray-500 text-xs">{row.email}</p>
                  </div>
                </div>
              ),
            },
            { key: 'phone', label: 'Phone' },
            {
              key: 'membershipExpiry',
              label: 'Expiry',
              render: (val) => val ? formatDate(val as string) : '—',
            },
            {
              key: 'isActive',
              label: 'Status',
              render: (_, row) => {
                const expired = row.membershipExpiry ? isExpired(row.membershipExpiry) : false;
                return (
                  <Badge
                    text={row.isActive && !expired ? 'Active' : 'Inactive'}
                    variant={row.isActive && !expired ? 'success' : 'danger'}
                  />
                );
              },
            },
            {
              key: 'uid',
              label: 'Actions',
              render: (_, row) => (
                <div className="flex items-center space-x-2">
                  <Link href={`/admin/members/${row.uid}`}>
                    <Button size="sm" variant="ghost">View</Button>
                  </Link>
                  <Button size="sm" variant="secondary" onClick={(e) => { e.stopPropagation(); setEditMember(row); }}>
                    Edit
                  </Button>
                  <Button size="sm" variant="danger" onClick={(e) => { e.stopPropagation(); handleDelete(row.uid); }}>
                    Delete
                  </Button>
                </div>
              ),
            },
          ]}
          data={filtered}
          keyExtractor={(m) => m.uid}
          emptyMessage="No members found"
        />
      </div>

      <Modal isOpen={!!editMember} onClose={() => setEditMember(null)} title="Edit Member" size="lg">
        {editMember && (
          <MemberForm
            initial={editMember}
            onSubmit={handleUpdate}
            onCancel={() => setEditMember(null)}
          />
        )}
      </Modal>
    </div>
  );
}
