import { Skeleton } from "@/components/ui/skeleton";
import { Scales } from "@/src/components/ui/scales";

/**
 * Full-page placeholder shown on a cold load while the first route chunk
 * resolves. Client-side navigations don't use this — the router keeps the
 * previous page on screen until the next one is ready.
 */
export default function PageSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading"
      className="flex-1 flex flex-col w-full min-w-0"
    >
      <div className="p-2 border-b flex items-center">
        <Skeleton className="h-4 w-24" />
      </div>
      <span className="relative block h-8 border-b">
        <Scales />
      </span>

      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-3.5 w-64" />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <Skeleton className="h-9 w-28 rounded-md" />
          <Skeleton className="h-9 w-32 rounded-md" />
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col overflow-hidden rounded-md border"
            >
              <Skeleton className="aspect-video w-full rounded-none" />
              <div className="flex flex-col gap-2 p-3.5">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <span className="relative block h-12 border-y">
        <Scales />
      </span>
    </div>
  );
}
