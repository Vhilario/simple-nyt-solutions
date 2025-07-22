"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

type MiniCell = {
  answer?: string
  clues?: number[]
  label?: string
  type?: number
}

type MiniClueText = {
  plain: string
}

type MiniClue = {
  cells: number[]
  direction: "Across" | "Down"
  label: string
  text: MiniClueText[]
  list?: number
}

type MiniClueList = {
  clues: number[]
  name: string
}

type MiniDimensions = {
  height: number
  width: number
}

type TheMiniData = {
  printDate: string
  cells: MiniCell[]
  clueLists: MiniClueList[]
  clues: MiniClue[]
  dimensions: MiniDimensions
}

export default function TheMiniSection({ theMiniData }: { theMiniData: TheMiniData }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="w-full min-h-[100svh] bg-[#6592e6] flex flex-col items-center justify-center relative pt-12 sm:pt-16 pb-20 lg:pb-0">
      <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
        <Card className="w-full bg-white/80 border-2 border-black rounded-xl shadow-lg p-2 sm:p-3 md:p-4 gap-2">
          <CardHeader className="pb-1 sm:pb-2 md:pb-3">
            <CardTitle className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-extrabold">
              The Mini
            </CardTitle>
            <CardDescription className="text-sm sm:text-base md:text-lg">
              {theMiniData?.printDate || 'No date available'}
            </CardDescription>
          </CardHeader>
          <CardContent className="py-1 sm:py-2 md:py-4 relative">
            <div className={`transition-all duration-300 ${revealed ? "blur-0" : "blur-lg"}`}>
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 justify-center items-center">
                {/* Puzzle Grid - Fixed size */}
                <div className="flex-shrink-0">
                  <div
                    className="grid border-2 border-black rounded-md overflow-hidden"
                    style={{
                      gridTemplateColumns: `repeat(${theMiniData?.dimensions?.width || 5}, 1fr)`,
                      gridTemplateRows: `repeat(${theMiniData?.dimensions?.height || 5}, 1fr)`,
                      width: "min(90vw, 400px)",
                      aspectRatio: `${theMiniData?.dimensions?.width || 5} / ${theMiniData?.dimensions?.height || 5}`,
                      background: "#222",
                    }}
                  >
                    {theMiniData?.cells?.map((cell, idx) => {
                      const isBlack = cell.type !== 1
                      return (
                        <div
                          key={idx}
                          className={`relative aspect-square flex items-center justify-center border border-black ${
                            isBlack ? "bg-black" : "bg-white"
                          }`}
                          style={{
                            minWidth: 0,
                            minHeight: 0,
                            fontWeight: "bold",
                            fontSize: "clamp(0.6rem, 1.5vw, 1.2rem)",
                            color: isBlack ? "#222" : "#222",
                            transition: "background 0.2s",
                          }}
                        >
                          {/* Show label in top-left if present and not black square */}
                          {!isBlack && cell.label && (
                            <span
                              className="absolute top-0 left-0 text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-500 pl-0.5 pt-0.5 select-none"
                              style={{ lineHeight: 1 }}
                            >
                              {cell.label}
                            </span>
                          )}
                          {/* Show answer letter if present and not black square */}
                          {!isBlack && cell.answer && (
                            <span className="select-none text-center leading-none text-4xl sm:text-5xl">{cell.answer}</span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
                
                {/* Clues Section - Flexible width, max height */}
                <div className="flex-shrink-0 w-full lg:w-auto max-w-sm lg:max-w-xs">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col">
                      <h3 className="font-bold text-lg mb-2">Across</h3>
                      <div className="flex flex-col gap-1">
                        {theMiniData?.clues?.filter(clue => clue.direction === "Across").map((clue, idx) => (
                          <div key={idx} className="text-sm leading-relaxed">
                            <span className="font-semibold">{clue.label}. </span>
                            {clue.text[0].plain}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-bold text-lg mb-2">Down</h3>
                      <div className="flex flex-col gap-1">
                        {theMiniData?.clues?.filter(clue => clue.direction === "Down").map((clue, idx) => (
                          <div key={idx} className="text-sm leading-relaxed">
                            <span className="font-semibold">{clue.label}. </span>
                            {clue.text[0].plain}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Click overlay - only appears when not revealed */}
            {!revealed && (
              <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
                onClick={() => setRevealed(true)}
              >
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 shadow-lg">
                  <p className="text-gray-700 font-medium text-sm sm:text-base md:text-lg">
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
  