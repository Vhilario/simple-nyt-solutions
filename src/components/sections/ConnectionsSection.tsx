"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

type ConnectionGroup = {
  level: string;
  members: string[];
};

type ConnectionsData = {
  id: number;
  printDate: string;
  groups: {
    [groupName: string]: ConnectionGroup;
  };
};

export default function ConnectionsSection({ connectionsData }: { connectionsData: ConnectionsData }) {
  const [revealed, setRevealed] = useState(false);

  const groupColors: Record<string, string> = {
    'YELLOW': '#f8da22',
    'GREEN': '#a0c45a',
    'BLUE': '#b1c4ef',
    'PURPLE': '#ba81c5',
  }

  return (
    <div className="w-full min-h-screen bg-[#b4a8fe] flex flex-col items-center justify-center relative pt-12 sm:pt-16">
      <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
        <Card className="w-full bg-white/80 border-2 border-black rounded-xl shadow-lg p-2 sm:p-3 md:p-4 gap-2">
          <CardHeader className="pb-1 sm:pb-2 md:pb-3">
            <CardTitle className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-extrabold">
              Connections
            </CardTitle>
            <CardDescription className="text-sm sm:text-base md:text-lg">
              {connectionsData?.printDate || 'No date available'}
            </CardDescription>
          </CardHeader>
          <CardContent className="py-1 sm:py-2 md:py-4 relative">
            <div className={`transition-all duration-300 ${revealed ? "blur-0" : "blur-lg"}`}>
              <div className="flex flex-col gap-1.5 sm:gap-2 md:gap-3">
                {connectionsData?.groups ? (
                  Object.entries(connectionsData.groups).map(([groupName, group]) => (
                    <div
                      key={groupName}
                      className="border rounded-lg p-1.5 sm:p-2 md:p-3"
                      style={{ backgroundColor: groupColors[group.level] }}
                    >
                      <div className="items-center justify-between mb-1 sm:mb-1.5">
                        <span className="font-bold text-sm sm:text-base md:text-lg lg:text-xl">{groupName}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 sm:gap-1.5">
                        {group.members.map((member, idx) => (
                          <span key={idx} className="bg-white border px-1 py-0.5 sm:px-1.5 sm:py-0.5 md:px-2 md:py-1 rounded shadow text-gray-800 text-xs sm:text-sm md:text-base lg:text-lg">
                            {member}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-red-600 text-center">No groups data available.</p>
                )}
              </div>
            </div>
            
            {/* Click overlay - only appears when not revealed */}
            {!revealed && (
              <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
                onClick={() => setRevealed(true)}
              >
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 shadow-lg">
                  <p className="text-gray-700 font-medium text-sm sm:text-base md:text-lg">
                    Click to reveal
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
  