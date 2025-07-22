"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";

type WordleData = {
  days_since_launch: number
  editor: string
  id: number
  printDate: string
  solution: string
}

export default function WordleSection({ wordleData }: { wordleData: WordleData }) {
  const [date, setDate] = useState("");
  const [revealed, setRevealed] = useState(false);
  
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  return (
    <div className="w-full min-h-[100dvh] bg-[#e3e3e1] flex flex-col items-center justify-center relative">
      <div className="py-4 sm:py-8 md:py-10">
        <Card className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-1 sm:mx-2 md:mx-4 lg:mx-auto bg-white/80 border-2 border-black rounded-xl shadow-lg p-2 sm:p-4 md:p-8">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-extrabold">
              Wordle
            </CardTitle>
            <CardDescription className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
              {date}
            </CardDescription>
          </CardHeader>
          <CardContent className="py-3 sm:py-6 md:py-12 relative">
            <div className={`transition-all duration-300 ${revealed ? "blur-0" : "blur-lg"}`}>
              <div className="flex flex-row items-center justify-center gap-0.5 sm:gap-1 md:gap-2">
                {wordleData?.solution ? (
                  wordleData.solution.split("").map((letter: string, index: number) => (
                    <div
                      key={index}
                      className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-white bg-[#6baa64] font-bold text-center w-10 h-10 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 flex items-center justify-center pb-0.5"
                    >
                      {letter}
                    </div>
                  ))
                ) : (
                  <span className="text-red-600">No solution available.</span>
                )}
              </div>
            </div>
            
            {/* Click overlay - only appears when not revealed */}
            {!revealed && (
              <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
                onClick={() => setRevealed(true)}
              >
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg px-6 py-3 shadow-lg">
                  <p className="text-gray-700 font-medium text-lg">
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
