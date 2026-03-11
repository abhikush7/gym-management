import { classNames } from '@/lib/utils/helpers';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  color?: 'blue' | 'red' | 'green' | 'yellow';
}

export default function StatsCard({ title, value, icon, color = 'blue' }: StatsCardProps) {
  const gradients = {
    blue: 'from-[#00d4ff]/20 to-transparent border-[#00d4ff]/20',
    red: 'from-red-500/20 to-transparent border-red-500/20',
    green: 'from-green-500/20 to-transparent border-green-500/20',
    yellow: 'from-yellow-500/20 to-transparent border-yellow-500/20',
  };

  const textColors = {
    blue: 'text-[#00d4ff]',
    red: 'text-red-400',
    green: 'text-green-400',
    yellow: 'text-yellow-400',
  };

  return (
    <div className={classNames('bg-gradient-to-br border rounded-xl p-6', gradients[color])}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <p className={classNames('text-3xl font-bold font-display', textColors[color])}>{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
}
