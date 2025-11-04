import { Skeleton } from "../ui/skeleton";

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

export function EventDetailSkeleton() {
  return (
    <div className="w-full max-w-5xl bg-dark-4 p-6 rounded-md flex flex-col items-center space-y-6">
      {/* Title */}
      <Skeleton className="h-8 w-2/3 bg-gray-500" />

      {/* Category badge */}
      <Skeleton className="h-6 w-24 bg-gray-500 rounded-full" />

      {/* Description */}
      <div className="space-y-2 w-full text-center">
        <Skeleton className="h-4 w-11/12 mx-auto bg-gray-500" />
        <Skeleton className="h-4 w-10/12 mx-auto bg-gray-500" />
        <Skeleton className="h-4 w-8/12 mx-auto bg-gray-500" />
      </div>

      {/* Details (date, location, etc.) */}
      <div className="space-y-3 w-full text-center">
        <Skeleton className="h-5 w-1/2 bg-gray-500 mx-auto" />
        <Skeleton className="h-5 w-2/3 bg-gray-500 mx-auto" />
        <Skeleton className="h-5 w-1/3 bg-gray-500 mx-auto" />
        <Skeleton className="h-5 w-1/4 bg-gray-500 mx-auto" />
      </div>

      {/* Button */}
      <Skeleton className="h-10 w-40 bg-gray-500 rounded-md" />
    </div>
  );
}
