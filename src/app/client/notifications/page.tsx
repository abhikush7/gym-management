'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '@/lib/hooks/useAuth';
import { notificationService } from '@/lib/services/notificationService';
import { Notification } from '@/lib/types';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Loader from '@/components/ui/Loader';
import { formatDateTime } from '@/lib/utils/helpers';

export default function NotificationsPage() {
  const { userData } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!userData?.uid) return;
    const data = await notificationService.getByUser(userData.uid);
    setNotifications(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, [userData?.uid]);

  const handleMarkRead = async (id: string) => {
    await notificationService.markAsRead(id);
    load();
  };

  const handleMarkAllRead = async () => {
    if (!userData?.uid) return;
    await notificationService.markAllRead(userData.uid);
    toast.success('All notifications marked as read');
    load();
  };

  if (loading) return <Loader />;

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const typeVariant = (type: Notification['type']) => {
    if (type === 'success') return 'success';
    if (type === 'warning') return 'warning';
    if (type === 'error') return 'danger';
    return 'info';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-black text-white uppercase">Notifications</h1>
          {unreadCount > 0 && <p className="text-gray-400">{unreadCount} unread</p>}
        </div>
        {unreadCount > 0 && (
          <Button variant="secondary" onClick={handleMarkAllRead}>Mark All Read</Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-12 text-center">
          <div className="text-6xl mb-4">🔔</div>
          <p className="text-white font-semibold mb-2">No notifications yet</p>
          <p className="text-gray-400 text-sm">You&apos;ll receive important updates here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`bg-[#111111] border rounded-xl p-5 transition-all ${
                !n.isRead ? 'border-[#00d4ff]/20 shadow-[0_0_10px_rgba(0,212,255,0.05)]' : 'border-[#1f1f1f]'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    {!n.isRead && <span className="w-2 h-2 bg-[#00d4ff] rounded-full shrink-0" />}
                    <Badge text={n.type} variant={typeVariant(n.type)} />
                    <span className="text-gray-500 text-xs">{formatDateTime(n.createdAt)}</span>
                  </div>
                  <h3 className="text-white font-semibold mb-1">{n.title}</h3>
                  <p className="text-gray-400 text-sm">{n.message}</p>
                </div>
                {!n.isRead && (
                  <Button size="sm" variant="ghost" onClick={() => handleMarkRead(n.id)}>Mark Read</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
