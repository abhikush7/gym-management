'use client';

import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '@/lib/hooks/useAuth';

export default function QRGenerator() {
  const { userData } = useAuth();

  if (!userData) return null;

  const qrData = JSON.stringify({
    uid: userData.uid,
    name: userData.displayName,
    ts: Date.now(),
  });

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="bg-white p-4 rounded-xl">
        <QRCodeSVG value={qrData} size={200} />
      </div>
      <p className="text-gray-400 text-sm text-center">
        Show this QR code at the entrance for check-in
      </p>
    </div>
  );
}
