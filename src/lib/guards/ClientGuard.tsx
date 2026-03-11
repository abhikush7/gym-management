'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Loader from '@/components/ui/Loader';

export default function ClientGuard({ children }: { children: React.ReactNode }) {
  const { userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!userData || userData.role !== 'client')) {
      router.replace('/login');
    }
  }, [userData, loading, router]);

  if (loading) return <Loader fullScreen />;
  if (!userData || userData.role !== 'client') return null;

  return <>{children}</>;
}
