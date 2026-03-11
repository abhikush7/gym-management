'use client';

import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { attendanceService } from '@/lib/services/attendanceService';
import Button from '@/components/ui/Button';

interface QRData {
  uid: string;
  name: string;
  ts: number;
}

export default function QRScanner() {
  const [scanning, setScanning] = useState(false);
  const scannerRef = useRef<{ clear: () => void | Promise<void> } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const startScanner = async () => {
    const { Html5Qrcode } = await import('html5-qrcode');
    if (!containerRef.current) return;

    const html5Qrcode = new Html5Qrcode('qr-reader');
    scannerRef.current = html5Qrcode;

    try {
      await html5Qrcode.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: 250 },
        async (decodedText) => {
          try {
            const data: QRData = JSON.parse(decodedText);
            await attendanceService.checkIn(data.uid, data.name, 'qr');
            toast.success(`${data.name} checked in!`);
            await stopScanner();
          } catch (err) {
            toast.error(err instanceof Error ? err.message : 'Check-in failed');
          }
        },
        () => {}
      );
      setScanning(true);
    } catch (err) {
      toast.error('Camera not available');
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      await scannerRef.current.clear();
      scannerRef.current = null;
    }
    setScanning(false);
  };

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        const result = scannerRef.current.clear();
        if (result && typeof (result as Promise<void>).catch === 'function') {
          (result as Promise<void>).catch(() => {});
        }
      }
    };
  }, []);

  return (
    <div className="space-y-4">
      <div ref={containerRef} id="qr-reader" className={scanning ? 'block' : 'hidden'} />
      {!scanning ? (
        <Button onClick={startScanner} className="w-full">
          📷 Start QR Scanner
        </Button>
      ) : (
        <Button variant="danger" onClick={stopScanner} className="w-full">
          ⏹ Stop Scanner
        </Button>
      )}
    </div>
  );
}
