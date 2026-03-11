'use client';

export const dynamic = 'force-dynamic';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { signUp } from '@/lib/firebase/auth';
import { memberService } from '@/lib/services/memberService';
import { User } from '@/lib/types';
import MemberForm from '@/components/forms/MemberForm';

export default function NewMemberPage() {
  const router = useRouter();

  const handleSubmit = async (data: Partial<User>) => {
    const email = data.email!;
    const name = data.displayName!;
    const user = await signUp(email, 'TempPass123!', name, 'client');
    await memberService.update(user.uid, data);
    toast.success('Member created! Default password: TempPass123!');
    router.push('/admin/members');
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-black text-white uppercase mb-6">Add New Member</h1>
      <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-6">
        <MemberForm onSubmit={handleSubmit} onCancel={() => router.back()} />
      </div>
    </div>
  );
}
