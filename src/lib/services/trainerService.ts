import { where, orderBy, arrayUnion, arrayRemove } from 'firebase/firestore';
import {
  getCollection,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
} from '../firebase/firestore';
import { Trainer } from '../types';

type TrainerInput = Omit<Trainer, 'id' | 'createdAt'>;

export const trainerService = {
  async getAll(): Promise<Trainer[]> {
    return getCollection<Trainer>('trainers', [orderBy('createdAt', 'desc')]);
  },

  async getActive(): Promise<Trainer[]> {
    return getCollection<Trainer>('trainers', [
      where('isActive', '==', true),
    ]);
  },

  async getById(id: string): Promise<Trainer | null> {
    return getDocument<Trainer>('trainers', id);
  },

  async create(trainer: TrainerInput): Promise<string> {
    return createDocument('trainers', {
      ...trainer,
      assignedMembers: trainer.assignedMembers || [],
    } as Record<string, unknown>);
  },

  async update(id: string, data: Partial<Trainer>): Promise<void> {
    return updateDocument('trainers', id, data);
  },

  async delete(id: string): Promise<void> {
    return deleteDocument('trainers', id);
  },

  async assignMember(trainerId: string, memberId: string): Promise<void> {
    return updateDocument('trainers', trainerId, {
      assignedMembers: arrayUnion(memberId) as unknown as string[],
    });
  },

  async removeMember(trainerId: string, memberId: string): Promise<void> {
    return updateDocument('trainers', trainerId, {
      assignedMembers: arrayRemove(memberId) as unknown as string[],
    });
  },
};
