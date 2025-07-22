import { unstable_cache } from 'next/cache'

export const runtime = 'edge'

async function getData() {
  // Calculate the current NYT "day" (resets at 3:00:30 AM PST)
  const nytDay = getCurrentNYTDay()
  
  return unstable_cache(
    async () => {
      // Your existing fetch logic here
      const API_URL = process.env.API_URL || 'https://nyt-games-api.onrender.com/'
      // ... fetch all puzzle data
    },
    [`nyt-puzzles-${nytDay}`], // Cache key includes the NYT day
    {
      revalidate: 3600, // Fallback: 1 hour
      tags: [`nyt-puzzles-${nytDay}`]
    }
  )()
}

export async function GET() {
  try {
    const data = await getData()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching wordle data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch wordle data' },
      { status: 500 }
    )
  }
} 