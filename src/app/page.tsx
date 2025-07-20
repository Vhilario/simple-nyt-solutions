import { AboutSection } from "@/components/sections/AboutSection";
import WordleSection from "@/components/sections/WordleSection";
import ConnectionsSection from "@/components/sections/ConnectionsSection";
import StrandsSection from "@/components/sections/StrandsSection";
import LetterBoxedSection from "@/components/sections/LetterBoxedSection";
import SpellingBeeSection from "@/components/sections/SpellingBeeSection";
import { toZonedTime } from 'date-fns-tz'

// Calculate time until next puzzle reset (3:01 AM PST)
function getTimeUntilNextReset() {
  const timeZone = 'America/Los_Angeles' // PST/PDT
  const now = new Date()
  
  // Get today's 3:01 AM in PST
  const todayReset = toZonedTime(
    new Date(now.getFullYear(), now.getMonth(), now.getDate(), 3, 1, 0), 
    timeZone
  )
  
  // If already past 3:01 AM today, get tomorrow's reset
  const nextReset = now >= todayReset 
    ? toZonedTime(
        new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 3, 1, 0), 
        timeZone
      )
    : todayReset
  
  return Math.floor((nextReset.getTime() - now.getTime()) / 1000)
}

// Server-side data fetching with Next.js caching
async function getData() {
  const API_URL = process.env.API_URL || 'https://nyt-games-api.onrender.com/';
  
  try {
    const [wordleRes, connectionsRes, strandsRes, spellingBeeRes, letterBoxedRes] = await Promise.all([
      fetch(`${API_URL}get_wordle_data`, { 
        next: { revalidate: 3600 } // Cache for 1 hour as fallback
      }),
      fetch(`${API_URL}get_connections_data`, { 
        next: { revalidate: 3600 } 
      }),
      fetch(`${API_URL}get_strands_data`, { 
        next: { revalidate: 3600 } 
      }),
      fetch(`${API_URL}get_spelling_bee_data`, { 
        next: { revalidate: 3600 } 
      }),
      fetch(`${API_URL}get_letter_boxed_data`, { 
        next: { revalidate: 3600 } 
      })
    ]);

    const [wordleData, connectionsData, strandsData, spellingBeeData, letterBoxedData] = await Promise.all([
      wordleRes.json(),
      connectionsRes.json(),
      strandsRes.json(),
      spellingBeeRes.json(),
      letterBoxedRes.json()
    ]);

    return {
      wordleData,
      connectionsData,
      strandsData,
      spellingBeeData,
      letterBoxedData
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    // Return empty arrays as fallback
    return {
      wordleData: [],
      connectionsData: [],
      strandsData: [],
      spellingBeeData: [],
      letterBoxedData: []
    };
  }
}

export default async function Home() {
  // This runs at build time and pre-populates the cache
  const { wordleData, connectionsData, strandsData, spellingBeeData, letterBoxedData } = await getData();

  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory fixed inset-0">
      <div className="snap-start">
        <AboutSection />
      </div>
      <div className="snap-start">
        <WordleSection wordleData={wordleData} />
      </div>
      <div className="snap-start">
        <ConnectionsSection connectionsData={connectionsData} />
      </div>
      <div className="snap-start">
        <LetterBoxedSection letterBoxedData={letterBoxedData} />
      </div>
      <div className="snap-start">
        <SpellingBeeSection spellingBeeData={spellingBeeData} />
      </div>
      <div className="snap-start">
        <StrandsSection strandsData={strandsData} />
      </div>
    </div>
  );
}

// Enable Incremental Static Regeneration - rebuild pages every hour
// Note: We can't use dynamic time calculation at build time, so we use a fixed 1-hour interval
export const revalidate = 3600;