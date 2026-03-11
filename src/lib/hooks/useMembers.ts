'use client';

import { useState, useEffect, useCallback } from 'react';
import { memberService } from '../services/memberService';
import { User } from '../types';

interface UseMembersResult {
  members: User[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useMembers(): UseMembersResult {
  const [members, setMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMembers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await memberService.getAll();
      setMembers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch members');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  return { members, loading, error, refetch: fetchMembers };
}
