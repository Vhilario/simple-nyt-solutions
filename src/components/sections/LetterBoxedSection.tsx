"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

// Type for Letter Boxed data
export type LetterBoxedData = {
  id: number;
  printDate: string;
  date: string;
  sides: string[];
  ourSolution: string[];
  yesterdaysSides: string[];
  yesterdaysSolution: string[];
  allSolutions: string[][];
  par: number;
  dictionary: string[];
  editor: string;
  editorImage: string;
  expiration: number;
  isFree: boolean;
  oneWordSolutions: string[];
  perfectSolutions: string[][];
  // Add any other fields you use
};

export default function LetterBoxedSection({ letterBoxedData }: { letterBoxedData: LetterBoxedData }) {
  const [revealed, setRevealed] = useState(false);

  const solutionToString = (solution: string[]) => {
    return solution.join("-")
  }

  return (
    <div className="w-full min-h-[100dvh] bg-[#fc716c] flex flex-col items-center justify-center relative">
      <div className="py-4 sm:py-6 md:py-8">
        <Card className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto bg-white/80 border-2 border-black rounded-xl shadow-lg p-2 sm:p-4 md:p-6 lg:p-8">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-extrabold">Letter Boxed</CardTitle>
            <CardDescription className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">{letterBoxedData.printDate}</CardDescription>
          </CardHeader>
          <CardContent className="py-3 sm:py-6 md:py-8 relative">
            <div className={`transition-all duration-300 ${revealed ? "blur-0" : "blur-lg"}`}>
              <div className="flex flex-col items-center">
                <span className="text-gray-700 text-base sm:text-lg mb-0.5 sm:mb-1">NYT Solution:</span>
                <span className="bg-[#fc716c]/20 border-2 border-[#fc716c] rounded-full px-3 sm:px-4 py-0.5 sm:py-1 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl">
                  {letterBoxedData.ourSolution?.length > 0
                    ? solutionToString(letterBoxedData.ourSolution)
                    : <span className="text-red-600">No solution available.</span>}
                </span>
              </div>
              
              <section className="mt-4 sm:mt-6 md:mt-8">
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-0.5 sm:mb-1 md:mb-2">All 2 Word Solutions:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5 sm:gap-1 md:gap-2 max-h-64 sm:max-h-80 overflow-y-auto">
                  {letterBoxedData.allSolutions?.length > 0 ? (
                    letterBoxedData.allSolutions.map((wordPair: string[]) => (
                      <span className="text-center text-sm sm:text-base md:text-lg py-0.5 sm:py-1" key={solutionToString(wordPair)}>
                        {solutionToString(wordPair)}
                      </span>
                    ))
                  ) : (
                    <span className="text-red-600">No solutions available.</span>
                  )}
                </div>
              </section>
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