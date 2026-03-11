import { orderBy } from 'firebase/firestore';
import {
  getCollection,
  createDocument,
  updateDocument,
  deleteDocument,
} from '../firebase/firestore';
import { Inquiry } from '../types';

type InquiryInput = Omit<Inquiry, 'id' | 'createdAt'>;

export const inquiryService = {
  async getAll(): Promise<Inquiry[]> {
    return getCollection<Inquiry>('inquiries', [orderBy('createdAt', 'desc')]);
  },

  async create(inquiry: InquiryInput): Promise<string> {
    return createDocument('inquiries', inquiry as Record<string, unknown>);
  },

  async updateStatus(id: string, status: Inquiry['status']): Promise<void> {
    return updateDocument('inquiries', id, { status });
  },

  async delete(id: string): Promise<void> {
    return deleteDocument('inquiries', id);
  },
};
