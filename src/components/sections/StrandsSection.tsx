import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

type StrandsData = {
  id: number;
  printDate: string;
  themeWords: string[];
  editor: string;
  constructors: string;
  spangram: string;
  clue: string;
  startingBoard: string[];
  themeCoords: Record<string, [number, number][]>;
  spangramCoords: [number, number][];
};

export default function StrandsSection({ strandsData }: { strandsData: StrandsData }) {
  const [revealed, setRevealed] = useState(false);

  if (!strandsData) {
    return (
      <div className="w-full min-h-screen bg-[#c0ddd9] flex flex-col items-center justify-center">
        <Card className="w-full max-w-2xl text-center">
          <CardHeader>
            <CardTitle>Strands</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600">No data available.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div
      className="w-full min-h-screen bg-[#c0ddd9] flex flex-col items-center justify-center relative cursor-pointer"
      onClick={() => setRevealed(!revealed)}
    >
      <div
        className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50 transition-opacity duration-300 ${
          revealed ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg px-6 py-3 shadow-lg">
          <p className="text-gray-700 font-medium text-lg">Click to reveal</p>
        </div>
      </div>
      <div className="py-10">
        <Card className="w-full max-w-2xl mx-2 sm:mx-4 md:mx-auto bg-white/80 border-2 border-black rounded-xl shadow-lg p-4 md:p-8">
          <CardHeader>
            <CardTitle className="text-xl md:text-3xl font-extrabold">Strands</CardTitle>
            <CardDescription className="text-base md:text-lg">{strandsData.printDate}</CardDescription>
          </CardHeader>
          <CardContent className={`transition-all duration-300 ${revealed ? "blur-0" : "blur-lg"}`}>
            <div className="grid gap-0">
                {Array.isArray(strandsData.startingBoard) && strandsData.startingBoard.length > 0 ? (
                  strandsData.startingBoard.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex">
                      {row.split('').map((char, colIndex) => (
                        <div 
                          key={`${rowIndex}-${colIndex}`} 
                          className="w-10 h-10 bg-white border flex items-center justify-center border-gray-300"
                          data-coords={`(${colIndex},${rowIndex})`}
                        >
                          {char}
                        </div>
                      ))}
                    </div>
                  ))
                ) : (
                  <span className="text-red-600">No board data available.</span>
                )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}