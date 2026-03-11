import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

if (!admin.apps.length) admin.initializeApp();
const db = admin.firestore();

export const onNewInquiry = functions.firestore
  .document('inquiries/{inquiryId}')
  .onCreate(async (snap) => {
    const inquiry = snap.data();

    const admins = await db.collection('users').where('role', '==', 'admin').get();

    const batch = db.batch();
    admins.docs.forEach((adminDoc) => {
      const notifRef = db.collection('notifications').doc();
      batch.set(notifRef, {
        userId: adminDoc.id,
        title: 'New Inquiry Received',
        message: `New inquiry from ${inquiry.name} (${inquiry.email}): ${inquiry.message.slice(0, 80)}...`,
        type: 'info',
        isRead: false,
        createdAt: new Date().toISOString(),
      });
    });

    await batch.commit();
  });

export const onMembershipExpired = functions.firestore
  .document('users/{userId}')
  .onUpdate(async (change) => {
    const before = change.before.data();
    const after = change.after.data();

    if (before.isActive === after.isActive) return;

    const now = new Date().toISOString();

    if (after.role === 'client' && after.membershipExpiry < now && after.isActive) {
      await change.after.ref.update({ isActive: false });

      await db.collection('notifications').add({
        userId: change.after.id,
        title: 'Membership Expired',
        message: 'Your membership has expired. Please renew to continue accessing IronForge facilities.',
        type: 'error',
        isRead: false,
        createdAt: now,
      });
    }
  });
