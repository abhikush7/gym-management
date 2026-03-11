'use client';

import { useState, useEffect, useCallback } from 'react';
import { attendanceService } from '../services/attendanceService';
import { Attendance } from '../types';

interface UseAttendanceResult {
  attendance: Attendance[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useTodayAttendance(): UseAttendanceResult {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAttendance = useCallback(async () => {
    try {
      setLoading(true);
      const data = await attendanceService.getTodayAttendance();
      setAttendance(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch attendance');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  return { attendance, loading, error, refetch: fetchAttendance };
}
