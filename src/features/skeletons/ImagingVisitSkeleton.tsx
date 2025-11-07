import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const ImagingVisitSkeleton: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-6 w-64" />
      </div>

      <div className="flex items-center gap-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-20 rounded-md" />
        ))}
      </div>

      <div className="p-6 border rounded-lg">
        <Skeleton className="h-6 w-1/2 mb-4" />
        <Skeleton className="h-12 w-full mb-3" />
        <div className="flex justify-center mt-6">
          <Skeleton className="h-10 w-40 rounded-lg" />
        </div>
      </div>
    </div>
  );
};
