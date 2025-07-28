import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    // Revalidate the main page and all game pages
    revalidatePath('/')
    revalidatePath('/wordle')
    revalidatePath('/connections')
    revalidatePath('/spelling-bee')
    revalidatePath('/strands')
    revalidatePath('/letter-boxed')
    revalidatePath('/mini')
    
    console.log('Cache revalidation completed at:', new Date().toISOString())
    
    return NextResponse.json({ 
      revalidated: true, 
      timestamp: new Date().toISOString() 
    })
  } catch (error) {
    console.error('Error revalidating cache:', error)
    return NextResponse.json(
      { error: 'Failed to revalidate cache' },
      { status: 500 }
    )
  }
}

// Also support GET requests for easier testing
export async function GET() {
  try {
    // Revalidate the main page and all game pages
    revalidatePath('/')
    revalidatePath('/wordle')
    revalidatePath('/connections')
    revalidatePath('/spelling-bee')
    revalidatePath('/strands')
    revalidatePath('/letter-boxed')
    revalidatePath('/mini')
    
    console.log('Cache revalidation completed at:', new Date().toISOString())
    
    return NextResponse.json({ 
      revalidated: true, 
      timestamp: new Date().toISOString() 
    })
  } catch (error) {
    console.error('Error revalidating cache:', error)
    return NextResponse.json(
      { error: 'Failed to revalidate cache' },
      { status: 500 }
    )
  }
} 