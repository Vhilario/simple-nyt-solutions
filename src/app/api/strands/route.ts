import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const API_URL = process.env.API_URL || 'https://nyt-games-api.onrender.com/'
    const response = await fetch(`${API_URL}get_strands_data`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching Strands data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Strands data' },
      { status: 500 }
    )
  }
} 