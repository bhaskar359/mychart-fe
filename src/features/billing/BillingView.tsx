// src/features/billing/BillingView.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Printer, Shield } from 'lucide-react';

// Component to display the balance card (matches the screenshot design)
const BalanceCard: React.FC = () => (
    <Card className="p-6 border border-gray-200 shadow-lg bg-blue-50">
        <CardContent className="flex justify-between items-center p-0">
            <div className="flex items-center space-x-4">
                <Shield className="w-10 h-10 text-blue-600 flex-shrink-0" />
                <div>
                    <h4 className="font-bold text-gray-800">USF Student Health Services</h4>
                    <p className="text-sm text-muted-foreground">Guarantor #418003 | Testaranth Balamicroda</p>
                    <p className="text-sm font-semibold mt-2">Physician Services</p>
                    <p className="text-xs text-muted-foreground">Patients Included: You</p>
                </div>
            </div>
            
            <div className="flex flex-col items-center">
                <p className="text-sm text-gray-700">Amount Due</p>
                <p className="text-4xl font-extrabold text-green-700">$0.00</p>
            </div>

            <div className="flex flex-col space-y-2">
                <Button variant="link" className="p-0 h-auto text-blue-600 hover:underline">
                    View Balance Details
                </Button>
                <Button variant="link" className="p-0 h-auto text-blue-600 hover:underline">
                    Contact Customer Service
                </Button>
            </div>
        </CardContent>
    </Card>
);


export const BillingView: React.FC = () => {
    return (
        <div className="p-6 md:p-10 lg:p-12 bg-white flex-grow">
            <div className="max-w-7xl mx-auto flex">
                
                {/* A. Main Content Column */}
                <div className="flex-grow max-w-4xl mr-8">
                    
                    {/* Header and Print Icon */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">Billing Summary</h1>
                        <Printer className="w-6 h-6 text-gray-500 cursor-pointer hover:text-blue-600" />
                    </div>

                    {/* Summary Description */}
                    <p className="text-sm text-muted-foreground mb-8">
                        As a result of your treatment at Tampa General Hospital (Hospital services) and USF Health (Physician services), as well as other hospital-based physician providers such as the ER Physician, Radiologist that interprets your X-Ray, Pathologist that interprets your Lab tests, or an Anesthesiologist.
                    </p>

                    {/* Balance Card */}
                    <BalanceCard />

                    {/* Invoice History (Placeholder) */}
                    <h2 className="text-xl font-semibold text-gray-800 mt-12 mb-4">Invoices</h2>
                    <Card className="p-8 shadow-inner bg-gray-50 border-gray-200 mb-8 min-h-[150px] flex items-center justify-center">
                        <p className="text-muted-foreground">No recent invoices found.</p>
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

                {/* B. Sidebar Column (Billing FAQs/Support) */}
                <Card className="w-80 p-6 shadow-md border border-gray-100 flex-shrink-0 h-fit bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Billing Information</h3>
                    
                    <div className="space-y-4 text-sm">
                        <div>
                            <h4 className="font-semibold mb-1">What is a guarantor?</h4>
                            <p className="text-muted-foreground">The guarantor is the person responsible for paying the balance of an account.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-1">What if I can't pay all at once?</h4>
                            <p className="text-muted-foreground">If you can't pay your whole bill at once, you may be able to set up a payment plan. This lets you automatically pay a small amount each month.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-1">USF COVID19 Financial Assistance</h4>
                            <p className="text-muted-foreground">If you need help paying your USF medical bill, we're here for you...</p>
                        </div>
                        <div className="border-t pt-3 mt-3">
                            <h4 className="font-semibold mb-1 text-blue-600">How else can I receive my billing information?</h4>
                            <p className="text-muted-foreground">You will still have the ability to receive billing communications online when possible...</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};