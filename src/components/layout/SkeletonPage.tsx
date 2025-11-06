import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface SkeletonPageProps {
    type?: 'auth' | 'portal';
}

/**
 * A simple skeleton screen to be used as a fallback in React Suspense.
 */
export const SkeletonPage: React.FC<SkeletonPageProps> = ({ type = 'portal' }) => {
    if (type === 'auth') {
        // Simplified layout for the login screen
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <Skeleton className="w-[380px] h-[400px] rounded-lg shadow-xl" />
            </div>
        );
    }

    // Default portal layout skeleton
    return (
        <div className="p-10 space-y-8 max-w-7xl mx-auto">
            {/* Header / Title Area */}
            <div className="flex justify-between items-center">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-10 w-32" />
            </div>

            {/* Grid of Dashboard Cards */}
            <div className="grid grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center p-6 border rounded-lg h-40">
                        <Skeleton className="h-10 w-10 rounded-full mb-4" />
                        <Skeleton className="h-4 w-3/4 mb-2" />
                        <Skeleton className="h-3 w-1/2" />
                    </div>
                ))}
            </div>

            {/* Announcement / Footer Area */}
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-16 w-full" />
        </div>
    );
};