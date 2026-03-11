import { where, orderBy } from 'firebase/firestore';
import {
  getCollection,
  createDocument,
  updateDocument,
} from '../firebase/firestore';
import { Attendance } from '../types';

export const attendanceService = {
  async checkIn(
    userId: string,
    userName: string,
    method: 'qr' | 'manual'
  ): Promise<string> {
    const today = new Date().toISOString().slice(0, 10);
    const existing = await getCollection<Attendance>('attendance', [
      where('userId', '==', userId),
      where('date', '==', today),
    ]);
    if (existing.length > 0) {
      throw new Error('Already checked in today');
    }
    const now = new Date().toISOString();
    return createDocument('attendance', {
      userId,
      userName,
      checkIn: now,
      date: today,
      method,
    } as Record<string, unknown>);
  },

  async checkOut(attendanceId: string): Promise<void> {
    return updateDocument('attendance', attendanceId, {
      checkOut: new Date().toISOString(),
    });
  },

  async getTodayAttendance(): Promise<Attendance[]> {
    const today = new Date().toISOString().slice(0, 10);
    return getCollection<Attendance>('attendance', [
      where('date', '==', today),
      orderBy('checkIn', 'desc'),
    ]);
  },

  async getUserAttendance(userId: string): Promise<Attendance[]> {
    return getCollection<Attendance>('attendance', [
      where('userId', '==', userId),
      orderBy('date', 'desc'),
    ]);
  },
};
