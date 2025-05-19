"use client"

import { useEffect } from "react"

// This component manages the active session cookie
export default function SessionManager() {
  useEffect(() => {
    // Set the active session cookie when the component mounts
    document.cookie = "active-session=true; path=/; max-age=30" // Short-lived cookie (30 seconds)

    // Set up an interval to refresh the cookie periodically while the user is active
    const interval = setInterval(() => {
      document.cookie = "active-session=true; path=/; max-age=30"
    }, 15000) // Refresh every 15 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval)
  }, [])

  return null // This component doesn't render anything
}
