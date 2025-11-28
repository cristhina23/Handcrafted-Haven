import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton({ grid }: { grid: number }) {
  return (
    <div
      className={`flex flex-col space-y-3 w-full animate-pulse border rounded-lg p-4 ${
        grid === 1 ? "max-w-full" : ""
      }`}
    >
      {/* Imagen */}
      <Skeleton className="h-48 w-full rounded-xl" />

      {/* Textos */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}
