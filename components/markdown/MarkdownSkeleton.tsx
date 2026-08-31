import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/** Placeholder for long-form project markdown while it's being fetched. */
export default function MarkdownSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "border-t pt-12 p-6 flex flex-col gap-4 max-w-full flex-1 min-w-0",
        className,
      )}
    >
      <Skeleton className="h-6 w-2/5" />
      <div className="flex flex-col gap-2.5">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-[94%]" />
        <Skeleton className="h-3.5 w-[97%]" />
        <Skeleton className="h-3.5 w-3/4" />
      </div>
      <Skeleton className="h-44 w-full rounded-md" />
      <Skeleton className="h-5 w-1/3 mt-2" />
      <div className="flex flex-col gap-2.5">
        <Skeleton className="h-3.5 w-[90%]" />
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-[85%]" />
      </div>
    </div>
  );
}
