import Link from 'next/link';
import { classNames } from '@/lib/utils/helpers';

interface PricingCardProps {
  name: string;
  price: number;
  duration: number;
  features: string[];
  isPopular?: boolean;
}

export default function PricingCard({ name, price, duration, features, isPopular }: PricingCardProps) {
  return (
    <div
      className={classNames(
        'relative bg-[#111111] border rounded-xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-2',
        isPopular
          ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)]'
          : 'border-[#1f1f1f] hover:border-[#00d4ff]/30'
      )}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-4 py-1 rounded-full">
            MOST POPULAR
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="font-display text-xl font-bold text-white mb-1">{name}</h3>
        <p className="text-gray-500 text-sm">{duration} {duration === 1 ? 'month' : 'months'}</p>
      </div>

      <div className="mb-6">
        <span className="font-display text-4xl font-bold text-white">₹{price.toLocaleString('en-IN')}</span>
        <span className="text-gray-500 text-sm ml-2">/ {duration === 1 ? 'month' : `${duration} months`}</span>
      </div>

      <ul className="space-y-3 flex-1 mb-8">
        {features.map((f, i) => (
          <li key={i} className="flex items-center space-x-3 text-sm text-gray-300">
            <svg className="w-4 h-4 text-[#00d4ff] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/register"
        className={classNames(
          'block text-center py-3 rounded-lg font-semibold text-sm transition-all duration-200',
          isPopular
            ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
            : 'border border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10'
        )}
      >
        Get Started
      </Link>
    </div>
  );
}
