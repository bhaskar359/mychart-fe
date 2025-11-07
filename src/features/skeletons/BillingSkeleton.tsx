import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const BillingSkeleton: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton className="h-32 rounded-lg" />
        <Skeleton className="h-32 rounded-lg" />
      </div>

      <div className="space-y-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="p-6 border border-gray-200 rounded-lg">
            <Skeleton className="h-5 w-1/3 mb-3" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};
