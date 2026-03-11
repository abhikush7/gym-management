import { where } from 'firebase/firestore';
import {
  getCollection,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
} from '../firebase/firestore';
import { DietPlan } from '../types';

type DietInput = Omit<DietPlan, 'id' | 'createdAt'>;

export const dietService = {
  async getByUser(userId: string): Promise<DietPlan[]> {
    return getCollection<DietPlan>('dietPlans', [
      where('userId', '==', userId),
    ]);
  },

  async getById(id: string): Promise<DietPlan | null> {
    return getDocument<DietPlan>('dietPlans', id);
  },

  async create(plan: DietInput): Promise<string> {
    return createDocument('dietPlans', plan as Record<string, unknown>);
  },

  async update(id: string, data: Partial<DietPlan>): Promise<void> {
    return updateDocument('dietPlans', id, data);
  },

  async delete(id: string): Promise<void> {
    return deleteDocument('dietPlans', id);
  },
};
