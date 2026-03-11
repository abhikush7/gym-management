import { where, orderBy } from 'firebase/firestore';
import { getCollection, getDocument, updateDocument, deleteDocument } from '../firebase/firestore';
import { User } from '../types';

export const memberService = {
  async getAll(): Promise<User[]> {
    return getCollection<User>('users', [
      where('role', '==', 'client'),
      orderBy('createdAt', 'desc'),
    ]);
  },

  async getById(id: string): Promise<User | null> {
    return getDocument<User>('users', id);
  },

  async update(id: string, data: Partial<User>): Promise<void> {
    return updateDocument('users', id, data);
  },

  async delete(id: string): Promise<void> {
    return deleteDocument('users', id);
  },

  async getActiveMembers(): Promise<User[]> {
    return getCollection<User>('users', [
      where('role', '==', 'client'),
      where('isActive', '==', true),
    ]);
  },

  async getExpiredMembers(): Promise<User[]> {
    const now = new Date().toISOString();
    return getCollection<User>('users', [
      where('role', '==', 'client'),
      where('membershipExpiry', '<', now),
    ]);
  },
};
