
"use client";

import LoadingSpinner from "@/components/LoadingGlow";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900">
      <LoadingSpinner />
    </div>
  );
}
