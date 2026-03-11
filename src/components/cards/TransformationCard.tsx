interface TransformationCardProps {
  name: string;
  duration: string;
  testimonial: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function TransformationCard({
  name,
  duration,
  testimonial,
  beforeLabel = 'BEFORE',
  afterLabel = 'AFTER',
}: TransformationCardProps) {
  return (
    <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl overflow-hidden hover:border-red-500/20 transition-all hover:-translate-y-1">
      <div className="flex">
        <div className="flex-1 relative bg-[#0a0a0a] h-48 flex items-center justify-center">
          <div className="absolute top-2 left-2 bg-black/70 text-red-400 text-xs font-bold px-2 py-0.5 rounded">
            {beforeLabel}
          </div>
          <div className="text-gray-700 text-5xl">👤</div>
        </div>
        <div className="w-px bg-[#1f1f1f]" />
        <div className="flex-1 relative bg-[#0a0a0a] h-48 flex items-center justify-center">
          <div className="absolute top-2 left-2 bg-black/70 text-[#00d4ff] text-xs font-bold px-2 py-0.5 rounded">
            {afterLabel}
          </div>
          <div className="text-gray-400 text-5xl">💪</div>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white font-semibold">{name}</h3>
          <span className="text-[#00d4ff] text-sm">{duration}</span>
        </div>
        <p className="text-gray-400 text-sm italic">"{testimonial}"</p>
      </div>
    </div>
  );
}
