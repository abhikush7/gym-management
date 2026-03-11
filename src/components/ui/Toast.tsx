'use client';

import { Toaster } from 'react-hot-toast';

export default function Toast() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#111111',
          color: '#ffffff',
          border: '1px solid #1f1f1f',
        },
        success: {
          iconTheme: {
            primary: '#00d4ff',
            secondary: '#000000',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#000000',
          },
        },
      }}
    />
  );
}
