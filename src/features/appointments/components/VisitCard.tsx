// src/features/appointments/components/VisitCard.tsx

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface VisitCardProps {
    date: string;
    office: string;
    provider: string;
    location: string;
}

export const VisitCard: React.FC<VisitCardProps> = ({ date, office, provider, location }) => {
    return (
        <Card className="p-4 mb-4 shadow-sm border border-gray-100 hover:border-blue-300 transition-colors duration-200">
            <CardContent className="flex justify-between items-center p-0">
                <div className="text-left grow">
                    <p className="text-lg font-semibold text-gray-800 mb-1">{office}</p>
                    <p className="text-sm text-muted-foreground">{provider}</p>
                    <p className="text-sm text-muted-foreground">{location}</p>
                </div>
                <div className="flex space-x-3 text-sm shrink-0">
                    <Button variant="link" className="text-blue-600 p-0 h-auto">
                        View after visit summary
                    </Button>
                    <Button variant="link" className="text-blue-600 p-0 h-auto">
                        View Clinical Notes
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};