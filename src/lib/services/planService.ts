import { where, orderBy } from 'firebase/firestore';
import {
  getCollection,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
} from '../firebase/firestore';
import { MembershipPlan } from '../types';

type PlanInput = Omit<MembershipPlan, 'id' | 'createdAt'>;

export const planService = {
  async getAll(): Promise<MembershipPlan[]> {
    return getCollection<MembershipPlan>('plans', [orderBy('price', 'asc')]);
  },

  async getActive(): Promise<MembershipPlan[]> {
    return getCollection<MembershipPlan>('plans', [
      where('isActive', '==', true),
      orderBy('price', 'asc'),
    ]);
  },

  async getById(id: string): Promise<MembershipPlan | null> {
    return getDocument<MembershipPlan>('plans', id);
  },

  async create(plan: PlanInput): Promise<string> {
    return createDocument('plans', plan as Record<string, unknown>);
  },

  async update(id: string, data: Partial<MembershipPlan>): Promise<void> {
    return updateDocument('plans', id, data);
  },

  async delete(id: string): Promise<void> {
    return deleteDocument('plans', id);
  },
};
