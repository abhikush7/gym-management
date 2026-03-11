interface LoaderProps {
  fullScreen?: boolean;
}

export default function Loader({ fullScreen = false }: LoaderProps) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="w-12 h-12 border-4 border-[#1f1f1f] border-t-[#00d4ff] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-8 h-8 border-4 border-[#1f1f1f] border-t-[#00d4ff] rounded-full animate-spin" />
    </div>
  );
}
