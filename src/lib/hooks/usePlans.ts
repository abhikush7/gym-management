'use client';

import { useState, useEffect, useCallback } from 'react';
import { planService } from '../services/planService';
import { MembershipPlan } from '../types';

interface UsePlansResult {
  plans: MembershipPlan[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function usePlans(activeOnly = false): UsePlansResult {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = useCallback(async () => {
    try {
      setLoading(true);
      const data = activeOnly ? await planService.getActive() : await planService.getAll();
      setPlans(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch plans');
    } finally {
      setLoading(false);
    }
  }, [activeOnly]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  return { plans, loading, error, refetch: fetchPlans };
}
