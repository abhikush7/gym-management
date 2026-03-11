'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';
import { signOut } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { userData } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#1f1f1f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-1">
            <span className="font-display text-2xl font-bold text-white">IRON</span>
            <span className="font-display text-2xl font-bold text-red-500">FORGE</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-gray-300 hover:text-white text-sm transition-colors">About</Link>
            <Link href="/trainers" className="text-gray-300 hover:text-white text-sm transition-colors">Trainers</Link>
            <Link href="/plans" className="text-gray-300 hover:text-white text-sm transition-colors">Plans</Link>
            <Link href="/transformations" className="text-gray-300 hover:text-white text-sm transition-colors">Transformations</Link>
            <Link href="/contact" className="text-gray-300 hover:text-white text-sm transition-colors">Contact</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {userData ? (
              <>
                <Link
                  href={userData.role === 'admin' ? '/admin' : '/client'}
                  className="text-[#00d4ff] hover:text-white text-sm transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-300 hover:text-white text-sm transition-colors">Login</Link>
                <Link
                  href="/register"
                  className="btn-primary px-4 py-2 text-sm bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-[#1f1f1f]">
            <Link href="/about" className="block text-gray-300 hover:text-white text-sm py-1">About</Link>
            <Link href="/trainers" className="block text-gray-300 hover:text-white text-sm py-1">Trainers</Link>
            <Link href="/plans" className="block text-gray-300 hover:text-white text-sm py-1">Plans</Link>
            <Link href="/transformations" className="block text-gray-300 hover:text-white text-sm py-1">Transformations</Link>
            <Link href="/contact" className="block text-gray-300 hover:text-white text-sm py-1">Contact</Link>
            {userData ? (
              <Link href={userData.role === 'admin' ? '/admin' : '/client'} className="block text-[#00d4ff] text-sm py-1">Dashboard</Link>
            ) : (
              <>
                <Link href="/login" className="block text-gray-300 hover:text-white text-sm py-1">Login</Link>
                <Link href="/register" className="block text-red-500 hover:text-red-400 text-sm py-1">Join Now</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
