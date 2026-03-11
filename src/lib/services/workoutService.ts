import { where } from 'firebase/firestore';
import {
  getCollection,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
} from '../firebase/firestore';
import { WorkoutPlan } from '../types';

type WorkoutInput = Omit<WorkoutPlan, 'id' | 'createdAt'>;

export const workoutService = {
  async getByUser(userId: string): Promise<WorkoutPlan[]> {
    return getCollection<WorkoutPlan>('workouts', [
      where('userId', '==', userId),
    ]);
  },

  async getById(id: string): Promise<WorkoutPlan | null> {
    return getDocument<WorkoutPlan>('workouts', id);
  },

  async create(plan: WorkoutInput): Promise<string> {
    return createDocument('workouts', plan as Record<string, unknown>);
  },

  async update(id: string, data: Partial<WorkoutPlan>): Promise<void> {
    return updateDocument('workouts', id, data);
  },

  async delete(id: string): Promise<void> {
    return deleteDocument('workouts', id);
  },
};
