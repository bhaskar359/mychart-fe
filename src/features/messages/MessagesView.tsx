// src/features/messages/MessagesView.tsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Send, ArrowLeft } from "lucide-react";
import { ConversationCard } from "./components/ConversationCard";

const MESSAGE_TABS = [
  "Conversations",
  "Automated Messages",
  "Appointments",
  "Bookmarked",
  "Trash",
];

export const MessagesView: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Conversations");

  const sampleMessage = {
    subject:
      "Your insurance has informed us that they need to contact them Patricia",
    body: "Hello,\nI am contacting you regarding the claim we submitted to your insurance for your visit on 4/28/2025. Your insurance has informed us that they need you to contact them to confirm if you have other insurance. They will not make any payments for any claims that they receive on your behalf until they hear from you. You can call them at the number that is on your insurance card. If you have any questions, you can call the Social Health Billing Office at 813-555-9999 option 7.",
    date: "Aug 29",
  };

  return (
    <div className="p-6 md:p-10 lg:p-12 bg-white flex-grow">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Message Center</h1>
          <div className="flex items-center space-x-4">
            <div className="relative flex-grow min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search Conversations"
                className="pl-10 py-2 border-gray-300 rounded-lg shadow-sm"
              />
            </div>
            <Button className="bg-blue-800 hover:bg-blue-700 text-white font-semibold flex items-center shadow-lg">
              <Send className="w-4 h-4 mr-2" /> Send a Message
            </Button>
          </div>
        </div>

        <div className="flex border-b border-gray-300 mb-6">
          {MESSAGE_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium transition-colors duration-200 
                                ${
                                  activeTab === tab
                                    ? "border-b-4 border-blue-800 text-blue-800"
                                    : "text-gray-600 hover:text-gray-800"
                                }
                            `}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-4 max-w-4xl">
          {activeTab === "Conversations" && (
            <ConversationCard {...sampleMessage} />
          )}
        </div>

        <div className="mt-12 text-center">
          <Link to="/dashboard">
            <Button variant="outline" className="px-6 py-3 border-gray-300">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Home page
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
