import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { useState, useEffect } from "react";

export default function LetterBoxedSection({letterBoxedData}: {letterBoxedData: any}) {
    const [date, setDate] = useState("");
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setDate(today);
    }, []);

    const solutionToString = (solution: string[]) => {
        return solution.join('-')
    }
  return (
    <div className="w-full h-screen bg-[#fc716c] flex items-center justify-center">
        <Accordion type="single" collapsible className="w-1/2 mx-auto px-4">
            <AccordionItem value="item-1">
                <AccordionTrigger>Letter Boxed Solution for {date}</AccordionTrigger>
                <AccordionContent>
                    <div>
                        {letterBoxedData?.ourSolution ? (
                            <h1>{solutionToString(letterBoxedData.ourSolution)}</h1>
                        ) : (
                            <p>Loading solution...</p>
                        )}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </div>
  );
}