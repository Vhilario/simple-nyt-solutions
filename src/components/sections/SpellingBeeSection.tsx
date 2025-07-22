"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useState, useEffect } from "react";

type SpellingBeeData = {
  pangrams: string[];
  answers: string[];
};

export default function SpellingBeeSection({
  spellingBeeData,
}: {
  spellingBeeData: SpellingBeeData;
}) {
  const [date, setDate] = useState("");
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#f8da22] flex flex-col items-center justify-center relative pt-12 sm:pt-16">
      <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
        <Card className="w-full bg-white/80 border-2 border-black rounded-xl shadow-lg p-2 sm:p-3 md:p-4 gap-2">
          <CardHeader className="pb-1 sm:pb-2 md:pb-3">
            <CardTitle className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-extrabold">
              Spelling Bee
            </CardTitle>
            <CardDescription className="text-sm sm:text-base md:text-lg">{date}</CardDescription>
          </CardHeader>
          <CardContent className="py-1 sm:py-2 md:py-4 relative">
            <div className={`transition-all duration-300 ${revealed ? "blur-0" : "blur-sm"}`}>
              <section className="mb-1 sm:mb-2 md:mb-4">
                <h3 className="text-sm sm:text-base md:text-lg font-bold mb-0.5 sm:mb-1">Pangrams</h3>
                <div className="flex flex-wrap gap-0.5 sm:gap-1 md:gap-2">
                  {spellingBeeData.pangrams?.map((p: string) => (
                    <span
                      className="bg-yellow-300 border border-yellow-600 rounded-full px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 font-semibold text-xs sm:text-sm md:text-base lg:text-lg"
                      key={p}
                    >
                      {p}
                    </span>
                  )) || <span className="text-red-600">No pangrams available.</span>}
                </div>
              </section>
              
              <section>
                <h3 className="text-sm sm:text-base md:text-lg font-bold mb-0.5 sm:mb-1">All Words</h3>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-0.5 sm:gap-1 md:gap-2 max-h-48 sm:max-h-64 md:max-h-80 overflow-y-auto">
                  {spellingBeeData.answers?.map((word: string) => (
                    <span className="text-center text-xs sm:text-sm md:text-base lg:text-lg py-0.5 sm:py-1" key={word}>
                      {word}
                    </span>
                  )) || <span className="text-red-600">No answers available.</span>}
                </div>
              </section>
            </div>
            
            {/* Click overlay - only appears when not revealed */}
            {!revealed && (
              <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
                onClick={() => setRevealed(true)}
              >
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 shadow-lg">
                  <p className="text-gray-700 font-medium text-sm sm:text-base md:text-lg">Click to reveal</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
