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

  if (!letterBoxedData) {
    return (
      <div className="w-full min-h-screen bg-[#fc716c] flex flex-col items-center justify-center">
        <Card className="w-full max-w-md sm:max-w-lg md:max-w-2xl mx-2 sm:mx-4 md:mx-auto bg-white/80 border-2 border-black rounded-xl shadow-lg p-4 md:p-8">
          <CardHeader>
            <CardTitle>Letter Boxed</CardTitle>
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
      className="w-full min-h-screen bg-[#fc716c] flex flex-col items-center justify-center relative cursor-pointer"
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
      <Card className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-1 sm:mx-2 md:mx-4 lg:mx-auto bg-white/80 border-2 border-black rounded-xl shadow-lg p-2 sm:p-4 md:p-5 gap-2">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-extrabold">Letter Boxed</CardTitle>
          <CardDescription className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">{letterBoxedData.printDate}</CardDescription>
        </CardHeader>
        <CardContent className={`py-3 sm:py-6 md:py-8 flex flex-col gap-3 sm:gap-4 md:gap-6 transition-all duration-300 ${revealed ? "blur-0" : "blur-lg"}`}>
          <div className="flex flex-col items-center">
            <span className="text-gray-700 text-base sm:text-lg mb-0.5 sm:mb-1">NYT Solution:</span>
            <span className="bg-[#fc716c]/20 border-2 border-[#fc716c] rounded-full px-3 sm:px-4 py-0.5 sm:py-1 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl">
              {letterBoxedData.ourSolution && letterBoxedData.ourSolution.length > 0
                ? solutionToString(letterBoxedData.ourSolution)
                : <span className="text-red-600">No solution available.</span>}
            </span>
          </div>
          <section>
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-0.5 sm:mb-1 md:mb-2">All 2 Word Solutions:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5 sm:gap-1 md:gap-2 max-h-64 sm:max-h-80 overflow-y-auto">
                {Array.isArray(letterBoxedData.allSolutions) && letterBoxedData.allSolutions.length > 0 ? (
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
        </CardContent>
      </Card>
    </div>
  );
}