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
  if (!wordleData) {
    return (
      <div className="w-full min-h-screen bg-[#e3e3e1] flex flex-col items-center justify-center">
        <Card className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-2 sm:mx-4 md:mx-auto bg-white/80 border-2 border-black rounded-xl shadow-lg p-4 md:p-8">
          <CardHeader>
            <CardTitle>Wordle</CardTitle>
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
      className="w-full min-h-screen bg-[#e3e3e1] flex flex-col items-center justify-center relative cursor-pointer"
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
        <Card className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-2 sm:mx-4 md:mx-auto bg-white/80 border-2 border-black rounded-xl shadow-lg p-4 md:p-8">
          <CardHeader>
            <CardTitle className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold">
              Wordle
            </CardTitle>
            <CardDescription className="text-base md:text-lg lg:text-xl xl:text-2xl">
              {date}
            </CardDescription>
          </CardHeader>
          <CardContent
            className={`transition-all duration-300 py-6 md:py-12 ${revealed ? "blur-0" : "blur-lg"}`}
          >
            <div className="flex flex-row items-center justify-center gap-1 md:gap-2">
              {wordleData.solution
                ? wordleData.solution.split("").map((letter: string, index: number) => (
                    <div
                      key={index}
                      className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-white bg-[#6baa64] font-bold text-center w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 flex items-center justify-center pb-1"
                    >
                      {letter}
                    </div>
                  ))
                : <span className="text-red-600">No solution available.</span>
              }
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
