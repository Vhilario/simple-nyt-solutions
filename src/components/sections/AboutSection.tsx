import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
  } from "@/components/ui/card";

import { Github } from "lucide-react";
import Link from "next/link";

import React from 'react'

export const AboutSection = () => {
  return (
    <div className="py-6 sm:py-8 md:py-10 min-h-screen flex justify-center items-center bg-gray-100">
        <Card className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto bg-white/80 border-2 border-black rounded-xl shadow-lg p-2 sm:p-4 md:p-6 lg:p-8">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-extrabold">
              Simple NYT Solutions
            </CardTitle>
            <CardDescription className="text-sm sm:text-base md:text-lg lg:text-xl">
              By: Vincent Hilario
            </CardDescription>
          </CardHeader>
          <CardContent
            className={`transition-all duration-300 py-3 sm:py-4 md:py-6`}
          >
            <div className="flex flex-col items-center justify-center gap-1 sm:gap-1.5 md:gap-2">
                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
                    This is a simple app for &quot;NYT&quot; games. This app is built with React (Next.js), Tailwind CSS, and TypeScript.
                </h2>
                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
                    <span className="text-red-500">Spoiler warning:</span> This app WILL reveal the solutions to the NYT games, for today. <span className="text-red-500 underline">Click at your own risk!</span>
                </h2>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex flex-col items-center justify-center gap-1 sm:gap-1.5 md:gap-2">
            <p className="text-xs sm:text-sm md:text-base">Disclaimer: This app is <span className="text-red-500 font-bold underline">not affiliated with The New York Times,</span> nor is it created with any financial gain in mind. This app was built mainly as a programming exercise.</p>
                <div className="flex flex-row items-center justify-center gap-1 sm:gap-1.5 md:gap-2">
                    <Link href="https://github.com/vhilario/simple-nyt-solutions">
                        <Github className="w-4 h-4" />
                    </Link>
                </div>
            </div>
          </CardFooter>
        </Card>
    </div>
  )
}

