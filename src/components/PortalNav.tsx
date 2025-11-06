// src/components/PortalNav.tsx

import React from "react";
import { NavLink } from "react-router-dom";
import {
  Eye,
  MessageSquare,
  CreditCard,
  Pill,
  ClipboardList,
  type LucideIcon,
  Clock,
} from "lucide-react";

// Define the structure for each navigation item (unchanged)
interface NavItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  {
    icon: Clock,
    label: "Schedule an Appointment",
    path: "/appointments",
  },
  { icon: Eye, label: "Visits", path: "/visits" },
  { icon: MessageSquare, label: "Messages", path: "/messages" },
  { icon: CreditCard, label: "Billing", path: "/billing" },
  { icon: Pill, label: "Medications", path: "/medications" },
  { icon: ClipboardList, label: "Test Reports", path: "/test-reports" },
];

export const PortalNav: React.FC = () => {
  return (
    // The nav bar background is white with a border (unchanged)
    <nav className="shadow-sm py-2">
      <div className="my-2 flex justify-center flex-wrap gap-x-4 gap-y-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center border border-gray-100 shadow-sm p-2 h-22 w-24 rounded-lg 
               text-xs font-medium transition-colors duration-200 
               ring-2 ring-transparent group cursor-pointer
               ${
                 isActive
                   ? // ACTIVE STATE: Dark Blue Background, White Text
                     "bg-custom-secondary text-white shadow-xl ring-brandPrimaryBg"
                   : // INACTIVE STATE: White Background, Dark Text, Light Blue Hover
                     "text-foreground hover:bg-custom-primary hover:text-white transition-all duration-200"
               }`
            }
          >
            {/* The Icon element */}
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full mb-2 transition-all duration-200 
                        ${
                          // Active: Icon background is white, Icon color is dark blue
                          // Inactive: Icon background is white, Icon color is dark blue
                          // Hover: Icon background is white, Icon color is dark blue (same as secondary-foreground)
                          "bg-white text-custom-tertiary"
                        }`}
            >
              {/* Icon color: Active/Inactive uses text-secondary-foreground (dark blue), 
                 unless active, in which case it uses the text-brandPrimaryBg-font (white)
                 We need explicit conditional coloring here for the icon to handle active state correctly.
              */}
              <item.icon className="w-6 h-6" />
            </div>

            {/* Label, ensuring text wraps */}
            <span
              className={`text-[10px] text-center transition-colors duration-200 
                        ${
                          // Label color: White when Active, Dark Blue when Inactive/Hover
                          ({ isActive }) =>
                            isActive
                              ? "text-white" // White
                              : "text-foreground group-hover:text-secondary-foreground" // Dark Blue (from foreground)
                        }`}
            >
              {item.label}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
