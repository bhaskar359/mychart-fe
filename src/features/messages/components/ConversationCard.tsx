// src/features/messages/components/ConversationCard.tsx

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

interface ConversationCardProps {
  subject: string;
  body: string;
  date: string;
}

export const ConversationCard: React.FC<ConversationCardProps> = ({
  subject,
  body,
  date,
}) => {
  return (
    <Card className="p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="flex justify-between items-start p-0">
        {/* Message Content */}
        <div className="flex items-start w-11/12 pr-4">
          <MessageSquare className="w-5 h-5 text-gray-500 mr-4 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">{subject}</h4>
            <p className="text-sm text-gray-700 line-clamp-3">{body}</p>
          </div>
        </div>

        {/* Date */}
        <div className="flex-shrink-0 text-right">
          <p className="text-xs text-muted-foreground whitespace-nowrap">
            {date}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
