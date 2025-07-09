"use client";
import { useState, useEffect } from "react";
import WordleSection from "@/components/sections/WordleSection";
import ConnectionsSection from "@/components/sections/ConnectionsSection";
import StrandsSection from "@/components/sections/StrandsSection";
import LetterBoxedSection from "@/components/sections/LetterBoxedSection";
import SpellingBeeSection from "@/components/sections/SpellingBeeSection";

export default function Home() {
  const [wordleData, setWordleData] = useState([]);
  const [connectionsData, setConnectionsData] = useState([]);
  const [strandsData, setStrandsData] = useState([]);
  const [spellingBeeData, setSpellingBeeData] = useState([]);
  const [letterBoxedData, setLetterBoxedData] = useState([]);

  useEffect(() => {
    const fetchWordleData = async () => {
      const response = await fetch('/api/wordle');
      const data = await response.json();
      setWordleData(data);
      console.log(data);
    };
    const fetchConnectionsData = async () => {
      const response = await fetch('/api/connections');
      const data = await response.json();
      setConnectionsData(data);
      console.log(data);
    };
    const fetchStrandsData = async () => {
      const response = await fetch('/api/strands');
      const data = await response.json();
      setStrandsData(data);
      console.log(data);
    };
    const fetchSpellingBeeData = async () => {
      const response = await fetch('/api/spelling-bee');
      const data = await response.json();
      setSpellingBeeData(data);
      console.log(data);
    };
    const fetchLetterBoxedData = async () => {
      const response = await fetch('/api/letter-boxed');
      const data = await response.json();
      setLetterBoxedData(data);
      console.log(data);
    };
    fetchWordleData();
    fetchConnectionsData();
    fetchStrandsData();
    fetchSpellingBeeData();
    fetchLetterBoxedData();
  }, []);

  return (
    
    <div className="">
        <WordleSection wordleData={wordleData} />
        <ConnectionsSection connectionsData={connectionsData} />
        <LetterBoxedSection letterBoxedData={letterBoxedData} />
        <SpellingBeeSection spellingBeeData={spellingBeeData} />
        <StrandsSection strandsData={strandsData} />
    </div>
  );
}
{/* <pre>{JSON.stringify(wordleData, null, 2)}</pre>
      <pre>{JSON.stringify(connectionsData, null, 2)}</pre>
      <pre>{JSON.stringify(spellingBeeData, null, 2)}</pre>
      <pre>{JSON.stringify(letterBoxedData, null, 2)}</pre> */}
