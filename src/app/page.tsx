"use client";
import { Button } from "@/components/ui/button";

import { useState, useEffect } from "react";
export default function Home() {
  const [wordleData, setWordleData] = useState([]);
  useEffect(() => {
    const fetchWordleData = async () => {
      try {
        const response = await fetch('/api/wordle');
        console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setWordleData(data);
      } catch (error) {
        console.error('Error fetching wordle data:', error);
      }
    };
    fetchWordleData();
  }, []);

  return (
    <div>
      <Button>Click me</Button>
      <pre>{JSON.stringify(wordleData, null, 2)}</pre>
    </div>
  );
}
