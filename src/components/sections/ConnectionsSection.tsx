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
  if (!connectionsData) {
    return (
      <div className="w-full min-h-screen bg-[#b4a8fe] flex flex-col items-center justify-center">
        <Card className="w-full max-w-md sm:max-w-lg md:max-w-2xl mx-2 sm:mx-4 md:mx-auto bg-white/80 border-2 border-black rounded-xl shadow-lg p-4 md:p-8">
          <CardHeader>
            <CardTitle>Connections</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600">No data available.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Defensive check for groups
  if (!connectionsData.groups || typeof connectionsData.groups !== 'object') {
    return (
      <div className="w-full min-h-screen bg-[#b4a8fe] flex flex-col items-center justify-center">
        <Card className="w-full max-w-md sm:max-w-lg md:max-w-2xl mx-2 sm:mx-4 md:mx-auto bg-white/80 border-2 border-black rounded-xl shadow-lg p-4 md:p-8">
          <CardHeader>
            <CardTitle>Connections</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600">No groups data available.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div
      className="w-full min-h-screen bg-[#b4a8fe] flex flex-col items-center justify-center relative cursor-pointer"
      onClick={() => setRevealed(!revealed)}
    >
      <div
        className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50 transition-opacity duration-300 ${
          revealed ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg px-6 py-3 shadow-lg">
          <p className="text-gray-700 font-medium text-lg">
            Click to reveal
          </p>
        </div>
      </div>
      <div className="py-10">
        <Card className="w-full max-w-md sm:max-w-lg md:max-w-2xl mx-2 sm:mx-4 md:mx-auto bg-white/80 border-2 border-black rounded-xl shadow-lg p-4 md:p-8">
          <CardHeader>
            <CardTitle className="text-xl md:text-3xl font-extrabold">
              Connections
            </CardTitle>
            <CardDescription className="text-base md:text-lg">
              {connectionsData.printDate}
            </CardDescription>
          </CardHeader>
          <CardContent
            className={`transition-all duration-300 py-6 md:py-12 ${revealed ? "blur-0" : "blur-lg"}`}
          >
            <div className="flex flex-col gap-6">
              {Object.entries(connectionsData.groups).map(([groupName, group]) => (
                <div
                  key={groupName}
                  className="border rounded-lg p-4"
                  style={{ backgroundColor: groupColors[group.level] }}
                >
                  <div className="flex flex-row items-center justify-between mb-2">
                    <span className="font-bold text-lg">{groupName}</span>
                    <span className="text-sm font-semibold text-gray-600">{group.level}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.members.map((member, idx) => (
                      <span key={idx} className="bg-white border px-3 py-1 rounded shadow text-gray-800">
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
  