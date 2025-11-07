import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const MedicationsSkeleton: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <Skeleton className="h-8 w-64" />
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-4 border border-gray-200 rounded-lg">
            <Skeleton className="h-5 w-2/3 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>

      <div className="p-6 border-dashed rounded-lg">
        <Skeleton className="h-10 w-48 mx-auto" />
      </div>
    </div>
  );
};
