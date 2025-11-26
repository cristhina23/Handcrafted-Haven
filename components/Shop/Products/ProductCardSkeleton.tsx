// components/ProductCardSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col space-y-3 w-full animate-pulse border rounded-lg p-4">
      {/* Imagen */}
      <Skeleton className="h-48 w-full rounded-xl" />
      {/* Texto */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4 rounded" />
        <Skeleton className="h-4 w-1/2 rounded" />
      </div>
    </div>
  );
}
