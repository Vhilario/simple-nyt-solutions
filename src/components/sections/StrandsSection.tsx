"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useRef, useEffect, useCallback } from "react";

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cellRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState({ width: 40, height: 40 });
  const [currentWord, setCurrentWord] = useState('')

  // Helper function to find which word contains a given coordinate
  const findWordAtCoordinate = useCallback((row: number, col: number): string => {
    if (!strandsData.themeCoords || !strandsData.spangramCoords) return '';
    
    // Check theme words
    for (const [word, coords] of Object.entries(strandsData.themeCoords)) {
      if (coords.some(([x, y]) => x === row && y === col)) {
        return word;
      }
    }
    
    // Check spangram
    if (strandsData.spangramCoords.some(([x, y]) => x === row && y === col)) {
      return strandsData.spangram;
    }
    
    return '';
  }, [strandsData.themeCoords, strandsData.spangramCoords, strandsData.spangram]);

  // Handle cell hover/tap
  const handleCellInteraction = useCallback((row: number, col: number) => {
    const word = findWordAtCoordinate(row, col);
    setCurrentWord(word);
  }, [findWordAtCoordinate]);

  // Measure cell size after mount
  useEffect(() => {
    if (cellRef.current) {
      const rect = cellRef.current.getBoundingClientRect();
      setCellSize({ width: rect.width, height: rect.height });
    }
  }, [strandsData.startingBoard]);

  // Update cell size and redraw canvas on window resize
  useEffect(() => {
    const handleResize = () => {
      if (cellRef.current) {
        const rect = cellRef.current.getBoundingClientRect();
        setCellSize({ width: rect.width, height: rect.height });
      }
    };
    window.addEventListener('resize', handleResize);
    // Initial call in case resize happened before mount
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [strandsData.startingBoard]);

  // Set canvas size to match grid
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !strandsData.startingBoard?.length || !strandsData.startingBoard[0]?.length) return;
    const boardWidth = strandsData.startingBoard[0].length * cellSize.width;
    const boardHeight = strandsData.startingBoard.length * cellSize.height;
    canvas.width = boardWidth;
    canvas.height = boardHeight;
    canvas.style.width = `${boardWidth}px`;
    canvas.style.height = `${boardHeight}px`;
  }, [strandsData.startingBoard, cellSize]);

  const drawSolutionPaths = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !revealed || !strandsData?.themeCoords || !strandsData?.spangramCoords) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    // Responsive line width based on cell size
    const baseLineWidth = Math.max(4, Math.floor(cellSize.width * 0.15));
    // Draw theme word paths
    Object.entries(strandsData.themeCoords).forEach(([, coords]) => {
      if (coords.length === 0) return;
      ctx.beginPath();
      // SWAP x and y for correct orientation
      const startX = coords[0][1] * cellSize.width + cellSize.width / 2;
      const startY = coords[0][0] * cellSize.height + cellSize.height / 2;
      ctx.moveTo(startX, startY);
      coords.slice(1).forEach(([x, y]) => {
        const canvasX = y * cellSize.width + cellSize.width / 2;
        const canvasY = x * cellSize.height + cellSize.height / 2;
        ctx.lineTo(canvasX, canvasY);
      });
      ctx.strokeStyle = '#aedfee';
      ctx.lineWidth = baseLineWidth;
      ctx.stroke();
    });
    // Draw spangram path
    if (strandsData.spangramCoords.length > 0) {
      ctx.beginPath();
      const startX = strandsData.spangramCoords[0][1] * cellSize.width + cellSize.width / 2;
      const startY = strandsData.spangramCoords[0][0] * cellSize.height + cellSize.height / 2;
      ctx.moveTo(startX, startY);
      strandsData.spangramCoords.slice(1).forEach(([x, y]) => {
        const canvasX = y * cellSize.width + cellSize.width / 2;
        const canvasY = x * cellSize.height + cellSize.height / 2;
        ctx.lineTo(canvasX, canvasY);
      });
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = baseLineWidth;
      ctx.stroke();
    }
  }, [revealed, strandsData.themeCoords, strandsData.spangramCoords, cellSize]);

  const drawLetterCircles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !revealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw circles for theme words
    Object.entries(strandsData.themeCoords).forEach(([, coords]) => {
      coords.forEach(([x, y]) => {
        const centerX = y * cellSize.width + cellSize.width / 2;
        const centerY = x * cellSize.height + cellSize.height / 2;
        const radius = Math.min(cellSize.width, cellSize.height) * 0.35;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = '#aedfee';
        ctx.fill();
      });
    });

    // Draw circles for spangram
    if (strandsData.spangramCoords.length > 0) {
      strandsData.spangramCoords.forEach(([x, y]) => {
        const centerX = y * cellSize.width + cellSize.width / 2;
        const centerY = x * cellSize.height + cellSize.height / 2;
        const radius = Math.min(cellSize.width, cellSize.height) * 0.35;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = '#ffd700';
        ctx.fill();
      });
    }
  }, [revealed, strandsData.themeCoords, strandsData.spangramCoords, cellSize]);

  useEffect(() => {
    drawSolutionPaths();
    drawLetterCircles();
  }, [drawSolutionPaths, drawLetterCircles]);

  return (
    <div
      className="w-full min-h-[100dvh] bg-[#c0ddd9] flex flex-col items-center justify-center relative cursor-pointer"
      onClick={() => setRevealed(true)}
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
      <div className="py-4 sm:py-6 md:py-8">
        <Card className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto bg-white/80 border-2 border-black rounded-xl shadow-lg p-2 sm:p-4 md:p-6 lg:p-8">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-extrabold">Strands</CardTitle>
            <CardDescription className="text-sm sm:text-base md:text-lg lg:text-xl">{strandsData.printDate}</CardDescription>
          </CardHeader>
            <div className={`flex justify-center items-center font-bold text-base sm:text-lg md:text-2xl lg:text-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] ${revealed ? '' : 'hidden'}`}> 
              <h1 className={currentWord === strandsData.spangram ? 'text-[#ffd700]' : 'text-[#aedfee]'}>
                {currentWord}
              </h1>
            </div>
          <CardContent className={`transition-all duration-300 ${revealed ? "blur-0" : "blur-lg"}`}>
            <div className="grid gap-0 relative">
                {strandsData.startingBoard?.length > 0 ? (
                  strandsData.startingBoard.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex">
                      {row.split('').map((char, colIndex) => (
                        <div
                          key={`${rowIndex}-${colIndex}`}
                          className="w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-12 lg:h-12 bg-white border flex items-center justify-center border-gray-300"
                          data-coords={`(${colIndex},${rowIndex})`}
                          ref={rowIndex === 0 && colIndex === 0 ? cellRef : undefined}
                          onMouseEnter={() => handleCellInteraction(rowIndex, colIndex)}
                          onClick={() => handleCellInteraction(rowIndex, colIndex)}
                        />
                      ))}
                    </div>
                  ))
                ) : (
                  <span className="text-red-600">No board data available.</span>
                )}
                <canvas
                  ref={canvasRef}
                  className="absolute top-0 left-0 pointer-events-none z-10"
                  style={{ width: '100%', height: '100%' }}
                />
                <div className="absolute top-0 left-0 w-full h-full z-20">
                  {strandsData.startingBoard?.length > 0 ? (
                    strandsData.startingBoard.map((row, rowIndex) => (
                      <div key={rowIndex} className="flex">
                        {row.split('').map((char, colIndex) => (
                          <div
                            key={`${rowIndex}-${colIndex}`}
                            className="w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-12 lg:h-12 flex items-center justify-center cursor-pointer"
                            onMouseEnter={() => handleCellInteraction(rowIndex, colIndex)}
                            onClick={() => handleCellInteraction(rowIndex, colIndex)}
                          >
                            <span className="text-base sm:text-lg md:text-2xl text-black font-bold">{char}</span>
                          </div>
                        ))}
                      </div>
                    ))
                  ) : null}
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}