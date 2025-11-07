import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const MessagesSkeleton: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-8 w-64" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-8 w-36" />
        </div>
      </div>

      <div className="space-y-4 max-w-4xl mx-auto">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-4 border border-gray-200 rounded-lg">
            <Skeleton className="h-5 w-1/3 mb-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-1/4 mt-3" />
          </div>
        ))}
      </div>
    </div>
  );
};
