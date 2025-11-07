import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const VisitsSkeleton: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <Skeleton className="h-6 w-1/3" />
      {[...Array(4)].map((_, i) => (
        <div key={i} className="p-4 border border-gray-200 rounded-lg">
          <Skeleton className="h-5 w-1/3 mb-2" />
          <Skeleton className="h-4 w-3/4" />
          <div className="mt-3">
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};
