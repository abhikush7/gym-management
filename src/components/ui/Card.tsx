import { HTMLAttributes } from 'react';
import { classNames } from '@/lib/utils/helpers';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: 'blue' | 'red' | 'none';
  hover?: boolean;
}

export default function Card({ children, className, glow = 'none', hover = false, ...props }: CardProps) {
  const glowClasses = {
    blue: 'shadow-[0_0_20px_rgba(0,212,255,0.15)] border-[#00d4ff]/20',
    red: 'shadow-[0_0_20px_rgba(239,68,68,0.15)] border-red-500/20',
    none: 'border-[#1f1f1f]',
  };

  return (
    <div
      className={classNames(
        'bg-[#111111] border rounded-xl p-6',
        glowClasses[glow],
        hover ? 'transition-transform hover:-translate-y-1 cursor-pointer' : '',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
