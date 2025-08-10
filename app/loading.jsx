export default function Loading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-primary">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin" />
        <p className="text-gray-300 font-mono">Loading...</p>
      </div>
    </div>
  );
}
