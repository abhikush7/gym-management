import { classNames } from '@/lib/utils/helpers';

interface BadgeProps {
  text: string;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default';
}

export default function Badge({ text, variant = 'default' }: BadgeProps) {
  const variants = {
    success: 'bg-green-500/10 text-green-400 border-green-500/20',
    warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    danger: 'bg-red-500/10 text-red-400 border-red-500/20',
    info: 'bg-blue-500/10 text-[#00d4ff] border-[#00d4ff]/20',
    default: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  };

  return (
    <span
      className={classNames(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        variants[variant]
      )}
    >
      {text}
    </span>
  );
}
