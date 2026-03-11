import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';

function getTransporter() {
  const user = functions.config().gmail?.user;
  const pass = functions.config().gmail?.password;

  if (!user || !pass) {
    throw new Error('Gmail credentials not configured. Set gmail.user and gmail.password in Firebase config.');
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });
}

export const sendEmail = functions.https.onCall(async (data: { to: string; subject: string; html: string }) => {
  const { to, subject, html } = data;

  const transporter = getTransporter();
  const user = functions.config().gmail?.user;

  await transporter.sendMail({
    from: `"IronForge Gym" <${user}>`,
    to,
    subject,
    html,
  });

  return { success: true };
});
