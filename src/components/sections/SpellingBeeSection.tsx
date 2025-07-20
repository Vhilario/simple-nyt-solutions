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
    <div 
      className="w-full min-h-[100dvh] bg-[#f8da22] flex flex-col items-center justify-center relative cursor-pointer"
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
      <div className="py-6 sm:py-8 md:py-10">
        <Card className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-1 sm:mx-2 md:mx-4 lg:mx-auto bg-white/80 border-2 border-black rounded-xl shadow-lg p-2 sm:p-4 md:p-6 lg:p-8 gap-2">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-extrabold">
              Spelling Bee
            </CardTitle>
            <CardDescription className="text-sm sm:text-base md:text-lg lg:text-xl">{date}</CardDescription>
          </CardHeader>
          <CardContent className={`transition-all duration-300 ${revealed ? "blur-0" : "blur-sm"}`}>
            <section className="mb-2 sm:mb-4 md:mb-8">
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-0.5 sm:mb-1 md:mb-2">Pangrams</h3>
              <div className="flex flex-wrap gap-0.5 sm:gap-1 md:gap-2">
                {spellingBeeData.pangrams?.map((p: string) => (
                  <span
                    className="bg-yellow-300 border border-yellow-600 rounded-full px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 font-semibold text-sm sm:text-base md:text-lg lg:text-xl"
                    key={p}
                  >
                    {p}
                  </span>
                )) || <span className="text-red-600">No pangrams available.</span>}
              </div>
            </section>
            <section>
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-0.5 sm:mb-1 md:mb-2">All Words</h3>
              <div className="grid grid-cols-3  md:grid-cols-4 gap-0.5 sm:gap-1 md:gap-2 max-h-64 sm:max-h-80 md:max-h-96 overflow-y-auto">
                {spellingBeeData.answers?.map((word: string) => (
                  <span className="text-center text-sm sm:text-base md:text-lg lg:text-xl py-0.5 sm:py-1" key={word}>
                    {word}
                  </span>
                )) || <span className="text-red-600">No answers available.</span>}
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
