import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().gmail?.user || '',
    pass: functions.config().gmail?.password || '',
  },
});

export const sendEmail = functions.https.onCall(async (data: { to: string; subject: string; html: string }) => {
  const { to, subject, html } = data;

  await transporter.sendMail({
    from: `"IronForge Gym" <${functions.config().gmail?.user}>`,
    to,
    subject,
    html,
  });

  return { success: true };
});
