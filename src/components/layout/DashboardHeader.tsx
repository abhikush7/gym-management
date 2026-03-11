'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { getInitials } from '@/lib/utils/helpers';
import { signOut } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';

export default function DashboardHeader() {
  const { userData } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-md border-b border-[#1f1f1f] px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-xs">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative text-gray-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {userData?.displayName ? getInitials(userData.displayName) : 'U'}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm text-white font-medium">{userData?.displayName}</p>
                <p className="text-xs text-gray-500 capitalize">{userData?.role}</p>
              </div>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-[#111111] border border-[#1f1f1f] rounded-lg shadow-xl py-1 z-50">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
