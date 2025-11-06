// src/features/medications/components/MedicationCard.tsx

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, RefreshCw, Trash2, Plus } from 'lucide-react';

interface MedicationCardProps {
    name: string;
    dosage: string;
    details: string;
    pharmacyDetails: string;
    approvedBy: string;
    status: 'Current' | 'RefillNeeded' | 'Inactive';
}

export const MedicationCard: React.FC<MedicationCardProps> = ({ 
    name, dosage, details, pharmacyDetails, approvedBy, status 
}) => {
    const isRefillable = status === 'Current';

    return (
        <Card className="p-4 mb-4 border border-gray-200 shadow-sm">
            <CardContent className="p-0">
                <div className="flex justify-between items-start mb-2">
                    {/* Title and Dosage */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
                        <p className="text-sm text-muted-foreground">{dosage}</p>
                    </div>
                    {/* Message Icon */}
                    <MessageSquare className="w-5 h-5 text-gray-400 cursor-pointer hover:text-blue-600" />
                </div>

                {/* Status/Warning Box */}
                {!isRefillable && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-3 text-sm text-red-700 mb-4">
                        This prescription cannot be refilled through MyChart. Contact your pharmacy for a refill.
                    </div>
                )}

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                    <div>
                        <p className="font-medium">Prescription Details</p>
                        <p className="text-muted-foreground">{details}</p>
                    </div>
                    <div>
                        <p className="font-medium">Pharmacy Details</p>
                        <p className="text-muted-foreground">{pharmacyDetails}</p>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t mt-4">
                    <p className="text-xs text-muted-foreground">Approved by: {approvedBy}</p>
                    
                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                        {isRefillable && (
                            <Button variant="outline" className="text-blue-600 hover:bg-blue-50">
                                <RefreshCw className="w-4 h-4 mr-2" /> Request refill
                            </Button>
                        )}
                        <Button variant="outline" className="text-red-600 hover:bg-red-50">
                            <Trash2 className="w-4 h-4 mr-2" /> Remove
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};