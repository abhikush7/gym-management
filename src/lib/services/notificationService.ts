import { where, orderBy } from 'firebase/firestore';
import {
  getCollection,
  createDocument,
  updateDocument,
} from '../firebase/firestore';
import { Notification } from '../types';

type NotificationInput = Omit<Notification, 'id' | 'createdAt'>;

export const notificationService = {
  async getByUser(userId: string): Promise<Notification[]> {
    return getCollection<Notification>('notifications', [
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
    ]);
  },

  async getUnread(userId: string): Promise<Notification[]> {
    return getCollection<Notification>('notifications', [
      where('userId', '==', userId),
      where('isRead', '==', false),
      orderBy('createdAt', 'desc'),
    ]);
  },

  async create(notification: NotificationInput): Promise<string> {
    return createDocument('notifications', {
      ...notification,
      isRead: false,
    } as Record<string, unknown>);
  },

  async markAsRead(id: string): Promise<void> {
    return updateDocument('notifications', id, { isRead: true });
  },

  async markAllRead(userId: string): Promise<void> {
    const unread = await this.getUnread(userId);
    await Promise.all(unread.map((n) => this.markAsRead(n.id)));
  },
};
