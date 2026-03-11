'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from '@/lib/firebase/auth';
import { classNames } from '@/lib/utils/helpers';

const menuItems = [
  { href: '/client', label: 'Dashboard', icon: '🏠', exact: true },
  { href: '/client/profile', label: 'Profile', icon: '👤' },
  { href: '/client/payments', label: 'Payments', icon: '💳' },
  { href: '/client/attendance', label: 'Attendance', icon: '📅' },
  { href: '/client/workout', label: 'Workout', icon: '💪' },
  { href: '/client/diet', label: 'Diet', icon: '🍎' },
  { href: '/client/bookings', label: 'Book Session', icon: '📋' },
  { href: '/client/notifications', label: 'Notifications', icon: '🔔' },
];

export default function ClientSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  const isActive = (href: string, exact?: boolean) => {
    return exact ? pathname === href : pathname.startsWith(href);
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0a0a0a] border-r border-[#1f1f1f] flex flex-col z-40">
      <div className="p-6 border-b border-[#1f1f1f]">
        <Link href="/" className="flex items-center space-x-1">
          <span className="font-display text-xl font-bold text-white">IRON</span>
          <span className="font-display text-xl font-bold text-red-500">FORGE</span>
        </Link>
        <p className="text-xs text-gray-500 mt-1">Member Portal</p>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={classNames(
              'flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
              isActive(item.href, item.exact)
                ? 'bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            )}
          >
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-[#1f1f1f]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
