import { Trainer } from '@/lib/types';
import Badge from '@/components/ui/Badge';
import { getInitials, truncate } from '@/lib/utils/helpers';

interface TrainerCardProps {
  trainer: Trainer;
}

export default function TrainerCard({ trainer }: TrainerCardProps) {
  return (
    <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-6 hover:border-[#1f1f1f]/50 transition-all hover:-translate-y-1">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
          {getInitials(trainer.name)}
        </div>
        <div>
          <h3 className="text-white font-semibold">{trainer.name}</h3>
          <p className="text-gray-500 text-sm">{trainer.experience} years experience</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-1 mb-3">
        {trainer.specialization.slice(0, 3).map((s) => (
          <Badge key={s} text={s} variant="info" />
        ))}
        {trainer.specialization.length > 3 && (
          <Badge text={`+${trainer.specialization.length - 3}`} variant="default" />
        )}
      </div>
      <p className="text-gray-400 text-sm line-clamp-3">{truncate(trainer.bio, 120)}</p>
    </div>
  );
}
