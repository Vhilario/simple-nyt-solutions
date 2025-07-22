import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toZonedTime, format } from "date-fns-tz"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Calculates the current NYT day based on the 3:00:30 AM PST/PDT reset time.
 * NYT puzzles reset at 3:00:30 AM Pacific Time (automatically handles PST/PDT).
 * This function returns a date string that changes when NYT resets.
 */
export function getCurrentNYTDay(): string {
  const now = new Date()
  
  // Convert current time to Pacific timezone (automatically handles PST/PDT)
  const pacificTime = toZonedTime(now, 'America/Los_Angeles')
  
  // Create the reset time for today in Pacific timezone
  const resetTime = new Date(pacificTime)
  resetTime.setHours(3, 0, 30, 0)
  
  // If current Pacific time is before 3:00:30 AM, use yesterday's date
  // If current Pacific time is after 3:00:30 AM, use today's date
  if (pacificTime < resetTime) {
    // Use yesterday's date
    const yesterday = new Date(pacificTime)
    yesterday.setDate(yesterday.getDate() - 1)
    return format(yesterday, 'yyyy-MM-dd', { timeZone: 'America/Los_Angeles' })
  } else {
    // Use today's date
    return format(pacificTime, 'yyyy-MM-dd', { timeZone: 'America/Los_Angeles' })
  }
}