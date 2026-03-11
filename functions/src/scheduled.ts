import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

if (!admin.apps.length) admin.initializeApp();
const db = admin.firestore();

export const sendExpiryReminders = functions.pubsub
  .schedule('0 8 * * *')
  .timeZone('Asia/Kolkata')
  .onRun(async () => {
    const now = new Date();
    const threeDaysLater = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

    const snapshot = await db.collection('users')
      .where('role', '==', 'client')
      .where('isActive', '==', true)
      .get();

    const batch = db.batch();

    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (!data.membershipExpiry) return;

      const expiry = new Date(data.membershipExpiry);
      const diff = expiry.getTime() - now.getTime();
      const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));

      if (daysLeft === 3) {
        const notifRef = db.collection('notifications').doc();
        batch.set(notifRef, {
          userId: doc.id,
          title: 'Membership Expiring Soon',
          message: `Your membership expires in 3 days on ${data.membershipExpiry.slice(0, 10)}. Renew now to avoid interruption.`,
          type: 'warning',
          isRead: false,
          createdAt: new Date().toISOString(),
        });
      }
    });

    await batch.commit();
    return null;
  });

export const sendPaymentReminders = functions.pubsub
  .schedule('0 9 * * *')
  .timeZone('Asia/Kolkata')
  .onRun(async () => {
    const now = new Date().toISOString();

    const snapshot = await db.collection('payments')
      .where('status', '==', 'pending')
      .where('dueDate', '<', now)
      .get();

    const batch = db.batch();

    snapshot.docs.forEach((doc) => {
      batch.update(doc.ref, { status: 'overdue' });

      const notifRef = db.collection('notifications').doc();
      batch.set(notifRef, {
        userId: doc.data().userId,
        title: 'Payment Overdue',
        message: `Your payment of ₹${doc.data().amount} for ${doc.data().planName} is now overdue. Please clear dues immediately.`,
        type: 'error',
        isRead: false,
        createdAt: new Date().toISOString(),
      });
    });

    await batch.commit();
    return null;
  });
