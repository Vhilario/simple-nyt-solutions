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
    <div className="w-full min-h-screen bg-[#f8da22] flex flex-col items-center justify-center">
      <Card className="w-full max-w-2xl bg-white/80 border-2 border-black rounded-xl shadow-lg p-8">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold">Spelling Bee</CardTitle>
          <CardDescription className="text-lg">{date}</CardDescription>
        </CardHeader>
        <CardContent>
          <section className="mb-8">
            <h3 className="text-xl font-bold mb-2">Pangrams</h3>
            <div className="flex flex-wrap gap-2">
              {spellingBeeData.pangrams.map((p: string) => (
                <span
                  className="bg-yellow-300 border border-yellow-600 rounded-full px-4 py-1 font-semibold"
                  key={p}
                >
                  {p}
                </span>
              ))}
            </div>
          </section>
          <section>
            <h3 className="text-xl font-bold mb-2">All Words</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-96 overflow-y-auto">
              {spellingBeeData.answers.map((word: string) => (
                <span className="text-center text-lg py-1" key={word}>
                  {word}
                </span>
              ))}
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}