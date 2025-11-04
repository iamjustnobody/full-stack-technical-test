export function LoadingSkeleton() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-dark-3 text-gray-100">
      <div className="animate-pulse text-lg text-gray-400">Loading…</div>
    </div>
  );
}
export function EventCardSkeleton() {
  return (
    <div className="bg-dark-2 rounded-lg p-4 space-y-3 w-full shadow-sm">
      <div className="h-6 w-3/4 bg-gray-500 rounded animate-pulse" />
      <div className="h-4 w-1/3 bg-gray-600 rounded animate-pulse" />
      <div className="h-24 w-full bg-gray-700 rounded animate-pulse" />
      <div className="h-8 w-2/3 bg-gray-500 rounded animate-pulse" />
    </div>
  );
}
