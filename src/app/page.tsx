import TabbedLayout from "@/components/TabbedLayout";
import { unstable_cache } from "next/cache";
import { getCurrentNYTDay } from "@/lib/utils";

// Server-side data fetching with NYT-specific caching
async function getData() {
  const API_URL = process.env.API_URL || 'https://nyt-games-api.onrender.com/';
  
  // Get current NYT day for cache key
  const nytDay = getCurrentNYTDay();
  
  return unstable_cache(
    async () => {
      try {
        const [wordleRes, connectionsRes, strandsRes, spellingBeeRes, letterBoxedRes, theMiniRes] = await Promise.all([
          fetch(`${API_URL}get_wordle_data`),
          fetch(`${API_URL}get_connections_data`),
          fetch(`${API_URL}get_strands_data`),
          fetch(`${API_URL}get_spelling_bee_data`),
          fetch(`${API_URL}get_letter_boxed_data`),
          fetch(`${API_URL}get_mini_data`)
        ]);

        const [wordleData, connectionsData, strandsData, spellingBeeData, letterBoxedData, theMiniData] = await Promise.all([
          wordleRes.json(),
          connectionsRes.json(),
          strandsRes.json(),
          spellingBeeRes.json(),
          letterBoxedRes.json(),
          theMiniRes.json()
        ]);

        return {
          wordleData,
          connectionsData,
          strandsData,
          spellingBeeData,
          letterBoxedData,
          theMiniData
        };
      } catch (error) {
        console.error('Error fetching data:', error);
        // Return empty arrays as fallback
        return {
          wordleData: [],
          connectionsData: [],
          strandsData: [],
          spellingBeeData: [],
          letterBoxedData: [],
          theMiniData: []
        };
      }
    },
    [`nyt-puzzles-${nytDay}`], // Cache key includes the NYT day
    {
      revalidate: 3600, // Fallback: 1 hour
      tags: [`nyt-puzzles-${nytDay}`]
    }
  )();
}

export default async function Home() {
  // This runs at build time and pre-populates the cache
  const { wordleData, connectionsData, strandsData, spellingBeeData, letterBoxedData, theMiniData } = await getData();

  return (
    <TabbedLayout
      wordleData={wordleData}
      connectionsData={connectionsData}
      strandsData={strandsData}
      spellingBeeData={spellingBeeData}
      letterBoxedData={letterBoxedData}
      theMiniData={theMiniData}
    />
  );
}

// Enable Incremental Static Regeneration with shorter interval for more responsive updates
// The unstable_cache will handle the precise NYT timing, this is just a fallback
export const revalidate = 1800; // 30 minutes fallback