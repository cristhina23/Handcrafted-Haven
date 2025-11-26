import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-gray-300 dark:bg-gray-700",
        className
      )}
      {...props}
    >
      {/* Wave animation */}
      <div
        className="absolute inset-0 -translate-x-full animate-[shimmer_1.2s_infinite]
                   bg-gradient-to-r from-transparent via-white/40 to-transparent"
      />
    </div>
  );
}
