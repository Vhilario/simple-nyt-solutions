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
  spellingBeeData?: SpellingBeeData;
}) {
  const [date, setDate] = useState("");
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  if (
    !spellingBeeData ||
    !Array.isArray(spellingBeeData.pangrams) ||
    !Array.isArray(spellingBeeData.answers)
  ) {
    return (
      <div className="w-full min-h-screen bg-[#f8da22] flex flex-col items-center justify-center">
        <Card className="w-full max-w-2xl text-center">
          <CardHeader>
            <CardTitle>Spelling Bee</CardTitle>
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
      className="w-full min-h-screen bg-[#f8da22] flex flex-col items-center justify-center relative cursor-pointer"
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
        <Card className="w-full max-w-6xl mx-2 sm:mx-4 md:mx-auto lg:min-w-[768px] bg-white/80 border-2 border-black rounded-xl shadow-lg p-4 md:p-8">
          <CardHeader>
            <CardTitle className="text-xl md:text-3xl font-extrabold">
              Spelling Bee
            </CardTitle>
            <CardDescription className="text-base md:text-lg">{date}</CardDescription>
          </CardHeader>
          <CardContent className={`transition-all duration-300 ${revealed ? "blur-0" : "blur-sm"}`}>
            <section className="mb-4 md:mb-8">
              <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Pangrams</h3>
              <div className="flex flex-wrap gap-1 md:gap-2">
                {spellingBeeData.pangrams.map((p: string) => (
                  <span
                    className="bg-yellow-300 border border-yellow-600 rounded-full px-3 md:px-4 py-1 font-semibold text-base md:text-lg"
                    key={p}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </section>
            <section>
              <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">All Words</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-2 max-h-96 overflow-y-auto">
                {spellingBeeData.answers.map((word: string) => (
                  <span className="text-center text-base md:text-lg py-1" key={word}>
                    {word}
                  </span>
                ))}
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
