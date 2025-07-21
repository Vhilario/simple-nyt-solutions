import TabbedLayout from "@/components/TabbedLayout";

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
    <TabbedLayout
      wordleData={wordleData}
      connectionsData={connectionsData}
      strandsData={strandsData}
      spellingBeeData={spellingBeeData}
      letterBoxedData={letterBoxedData}
    />
  );
}

// Enable Incremental Static Regeneration - rebuild pages every hour
// Note: We can't use dynamic time calculation at build time, so we use a fixed 1-hour interval
export const revalidate = 3600;