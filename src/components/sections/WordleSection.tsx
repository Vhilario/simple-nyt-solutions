import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { useState, useEffect } from "react";

export default function WordleSection({wordleData}: {wordleData: any}) {
    const [date, setDate] = useState("");
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setDate(today);
    }, []);
  return (
    <div className="w-full h-screen bg-[#e3e3e1] flex items-center justify-center">
        <Accordion type="single" collapsible className="w-1/2 mx-auto px-4">
            <AccordionItem value="item-1">
                <AccordionTrigger>Wordle Solution for {date}</AccordionTrigger>
                <AccordionContent>
                    <div>
                        {wordleData?.solution ? (
                            <h1>{wordleData.solution}</h1>
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