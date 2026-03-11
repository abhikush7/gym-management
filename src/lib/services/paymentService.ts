import { where, orderBy } from 'firebase/firestore';
import {
  getCollection,
  createDocument,
  updateDocument,
} from '../firebase/firestore';
import { Payment } from '../types';

type PaymentInput = Omit<Payment, 'id' | 'createdAt'>;

export const paymentService = {
  async getAll(): Promise<Payment[]> {
    return getCollection<Payment>('payments', [orderBy('createdAt', 'desc')]);
  },

  async getByUser(userId: string): Promise<Payment[]> {
    return getCollection<Payment>('payments', [
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
    ]);
  },

  async getPending(): Promise<Payment[]> {
    return getCollection<Payment>('payments', [
      where('status', 'in', ['pending', 'overdue']),
      orderBy('dueDate', 'asc'),
    ]);
  },

  async create(payment: PaymentInput): Promise<string> {
    return createDocument('payments', payment as Record<string, unknown>);
  },

  async markPaid(id: string, method: Payment['method']): Promise<void> {
    return updateDocument('payments', id, {
      status: 'paid',
      method,
      paidDate: new Date().toISOString(),
    });
  },

  async getRevenue(start: string, end: string): Promise<number> {
    const payments = await getCollection<Payment>('payments', [
      where('status', '==', 'paid'),
      where('paidDate', '>=', start),
      where('paidDate', '<=', end),
    ]);
    return payments.reduce((sum, p) => sum + p.amount, 0);
  },

  generateInvoiceNumber(): string {
    const now = new Date();
    const date = now.toISOString().slice(0, 10).replace(/-/g, '');
    const rand = Math.floor(Math.random() * 900) + 100;
    return `INV-${date}-${rand}`;
  },
};
