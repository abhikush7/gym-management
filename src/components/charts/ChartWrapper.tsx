interface ChartWrapperProps {
  title: string;
  children: React.ReactNode;
}

export default function ChartWrapper({ title, children }: ChartWrapperProps) {
  return (
    <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-6">
      <h3 className="text-white font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}
