import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const AuthSkeleton: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        {/* Logo/Header Area */}
        <div className="flex flex-col items-center space-y-4">
          <Skeleton className="h-12 w-48" /> {/* Logo */}
          <Skeleton className="h-6 w-64" /> {/* Title */}
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <Skeleton className="h-10 w-full rounded-md" /> {/* Email */}
          <Skeleton className="h-10 w-full rounded-md" /> {/* Password */}
          <Skeleton className="h-4 w-32" /> {/* Remember me */}
          <Skeleton className="h-11 w-full rounded-md" /> {/* Submit button */}
        </div>

        {/* Links */}
        <div className="flex justify-between pt-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
};
