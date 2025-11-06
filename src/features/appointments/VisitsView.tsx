// src/features/appointments/VisitsView.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { VisitCard } from './components/VisitCard'; // The new component
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const VisitsView: React.FC = () => {

    const pastVisits = [
        { 
            date: "28th April, 2025",
            office: "Office Visit",
            provider: "Diego Riveros, MD",
            location: "USF Student Health Services and Wellness Center"
        },
        { 
            date: "17th March, 2025",
            office: "Office Visit",
            provider: "Diego Riveros, MD",
            location: "USF Student Health Services and Wellness Center"
        },
        // Add more past visits here...
    ];

    return (
        <div className="p-6 md:p-10 lg:p-12 bg-white flex-grow">
            <div className="max-w-7xl mx-auto flex">
                
                {/* 1. Main Content Column */}
                <div className="flex-grow max-w-4xl mr-8">
                    
                    {/* Header and Schedule Button */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Appointments and Visits
                        </h1>
                        <Link to="/appointments">
                            <Button className="bg-blue-800 hover:bg-blue-700 text-white font-semibold">
                                Schedule an Appointment <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>

                    {/* Upcoming Visits Section */}
                    <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
                        Upcoming Visits
                    </h2>
                    <Card className="p-8 shadow-inner bg-gray-50 border-gray-200 mb-8">
                        <p className="text-center text-muted-foreground">
                            There are no upcoming visits to display.
                        </p>
                    </Card>

                    {/* Past Visits Section */}
                    <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
                        Past Visits
                    </h2>

                    {/* Past Visit Cards */}
                    {pastVisits.map((visit, index) => (
                        <div key={index}>
                            <p className="text-blue-600 text-sm font-medium mb-1">{index === 0 ? '3 Months ago' : '4 Months ago'}</p>
                            <VisitCard {...visit} />
                        </div>
                    ))}

                    <div className="mt-10 text-center">
                        <Link to="/dashboard"> 
                            <Button variant="outline" className="px-6 py-3 border-gray-300">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Home page
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* 3. Sidebar Column (Related Links) */}
                <Card className="w-80 p-6 shadow-md border border-gray-100 flex-shrink-0 h-fit">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Related Links</h3>
                    <ul className="space-y-3">
                        <li className="text-blue-600 text-sm hover:underline cursor-pointer">
                            Document Center
                        </li>
                        <li className="text-blue-600 text-sm hover:underline cursor-pointer">
                            Health Summary
                        </li>
                        <li className="text-blue-600 text-sm hover:underline cursor-pointer">
                            Immunizations
                        </li>
                        <li className="text-blue-600 text-sm hover:underline cursor-pointer">
                            Preventive Care
                        </li>
                    </ul>
                </Card>
            </div>
        </div>
    );
};