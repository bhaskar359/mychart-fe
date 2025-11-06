// src/features/medications/MedicationsView.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Plus } from 'lucide-react';
import { MedicationCard } from './components/MedicationCard';

export const MedicationsView: React.FC = () => {
    
    // Sample data for the medication list
    const medications = [
        {
            name: "Benzonatate 200 mg capsule",
            dosage: "Take as needed.",
            details: "Dispensed 2025-01-15, Quantity: 20 Capsules",
            pharmacyDetails: "CVS Pharmacy - Tampa, FL - (555) 123-4567",
            approvedBy: "Kathy Owens, MD",
            status: 'Current' as const,
        },
        {
            name: "Docosahexaenoic acid/EPA (FISH OIL ORAL)",
            dosage: "Take 1 by mouth",
            details: "Prescription Details",
            pharmacyDetails: "CVS Pharmacy - Tampa, FL",
            approvedBy: "Dr. LPN Seaton, LPN",
            status: 'Inactive' as const,
        },
        // Add more meds to match the scrolling list from the screenshot
    ];

    return (
        <div className="p-6 md:p-10 lg:p-12 bg-white flex-grow">
            <div className="max-w-7xl mx-auto flex">
                
                {/* A. Main Content Column */}
                <div className="flex-grow max-w-4xl mr-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Medications</h1>

                    {/* Action and Alert Area */}
                    <div className="flex justify-between items-center mb-6">
                        <p className="text-sm text-red-600 font-semibold">
                            Please review your medications and verify that the list is up to date. Call 911 if you have an emergency.
                        </p>
                        <Button variant="outline" className="text-blue-800 hover:bg-blue-50">
                            Request refills
                        </Button>
                    </div>
                    
                    {/* Pharmacy Alert */}
                    <div className="mb-8">
                        <p className="text-sm text-gray-700">Need to update your list of pharmacies? 
                            <a href="#" className="text-blue-600 hover:underline ml-1 font-medium">
                                Go to Manage My Pharmacies.
                            </a>
                        </p>
                    </div>

                    {/* Current Medications List */}
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Medications</h2>
                    <div className="space-y-4">
                        {medications.map((med, index) => (
                            <MedicationCard key={index} {...med} />
                        ))}
                    </div>

                    <div className="my-8 text-center">
                        <Button variant="outline" className="text-blue-600 border-blue-300 hover:bg-blue-50">
                            <Plus className="w-4 h-4 mr-2" /> Report a medication
                        </Button>
                    </div>
                    
                    {/* Personal Notes Section */}
                    <h2 className="text-xl font-semibold text-gray-800 mt-12 mb-4">Personal Notes About My Medications</h2>
                    <p className="text-sm text-muted-foreground mb-4">Notes entered here will not be viewable by your doctor.</p>
                    
                    <Card className="p-8 border-dashed border-2 border-gray-300 bg-gray-50 flex items-center justify-center min-h-[100px]">
                        <Button variant="ghost" className="text-blue-600 hover:bg-transparent">
                            <Plus className="w-5 h-5 mr-2" /> Add a personal note
                        </Button>
                    </Card>

                    {/* Home page button */}
                    <div className="mt-10 text-center">
                        <Link to="/dashboard"> 
                            <Button variant="outline" className="px-6 py-3 border-gray-300">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Home page
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* B. Sidebar Column (Related Links) */}
                <Card className="w-80 p-6 shadow-md border border-gray-100 flex-shrink-0 h-fit bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Related Links</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="text-blue-600 hover:underline cursor-pointer">
                            Health Summary
                        </li>
                        <li className="text-blue-600 hover:underline cursor-pointer">
                            Allergies
                        </li>
                        <li className="text-blue-600 hover:underline cursor-pointer">
                            Immunization
                        </li>
                        <li className="text-blue-600 hover:underline cursor-pointer">
                            Preventive Care
                        </li>
                    </ul>
                </Card>
            </div>
        </div>
    );
};