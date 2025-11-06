// src/components/layout/Footer.tsx

import React from "react";
import { Separator } from "@/components/ui/separator";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-50 border-t mt-12">
      <div className="py-8 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          <div>
            <h4 className="font-semibold mb-2 text-gray-800">Resources</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>
                <a href="#" className="hover:underline">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-gray-800">Legal</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Patient Rights
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-gray-800">About</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>
                <a href="#" className="hover:underline">
                  Our Clinic
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Provider Directory
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-gray-800">
              MyChart Support
            </h4>
            <p className="text-muted-foreground">Call us at (555) 123-4567</p>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} MyChart Portal. All rights reserved.
          <p className="mt-1">
            A project developed using React, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};
