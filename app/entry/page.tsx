"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import dynamic from 'next/dynamic'

// Dynamically import the video component
const VideoBackground = dynamic(() => import('@/components/VideoBackground'), {
  ssr: false,
  loading: () => (
    <div className="absolute w-full h-full bg-black animate-pulse" />
  ),
})

// This page intentionally doesn't include the StickyNav component
export default function EntryPage() {
  const router = useRouter()
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [fadeIn, setFadeIn] = useState(false)
  const [response, setResponse] = useState<string | null>(null)
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    // Trigger fade-in animation after a short delay
    const timer = setTimeout(() => {
      setFadeIn(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleResponse = (isHuman: boolean) => {
    // Show the appropriate response based on the answer
    if (isHuman) {
      setResponse("Well isnt that just great...go on i guess??")
    } else {
      setResponse("Just who i was looking for, your pretty cool whoever you are.")
    }

    // Set redirecting state to show the response
    setIsRedirecting(true)
  }

  const enterSite = () => {
    // Set cookies for navigation
    document.cookie = "visited-entry=true; path=/; max-age=86400" // 24 hours
    document.cookie = "active-session=true; path=/; max-age=30" // 30 seconds

    // Navigate to home page
    window.location.href = "/"
  }

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      {/* Video Background */}
      <Suspense fallback={<div className="absolute w-full h-full bg-black animate-pulse" />}>
        <VideoBackground onLoadedData={() => setVideoLoaded(true)} />
      </Suspense>

      {/* Dark overlay - made darker for better text visibility */}
      <div className="absolute inset-0 bg-black/75 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4">
        <div className="text-center max-w-2xl bg-black/40 p-8 rounded-lg backdrop-blur-sm">
          {!isRedirecting ? (
            <>
              <h1 className="text-white text-4xl md:text-6xl font-bold mb-8 text-shadow-lg">
                WELCOME TO <br />
                <span className="text-5xl md:text-7xl drop-shadow-lg">PLANET9INE</span>
              </h1>

              <p className="text-white text-xl md:text-2xl mb-12 drop-shadow-lg">ARE YOU HUMAN?</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => handleResponse(true)}
                  className="bg-white text-black font-bold py-3 px-8 rounded-md hover:bg-gray-200 transition-colors text-lg shadow-lg"
                >
                  YES
                </button>

                <button
                  onClick={() => handleResponse(false)}
                  className="bg-white text-black font-bold py-3 px-8 rounded-md hover:bg-gray-200 transition-colors text-lg shadow-lg"
                >
                  NO
                </button>
              </div>
            </>
          ) : (
            <div className="animate-in fade-in-50">
              <h2 className="text-white text-5xl md:text-7xl font-bold mb-8 drop-shadow-lg">PLANET9INE</h2>

              <p className="text-white text-xl md:text-2xl mb-12 drop-shadow-lg">{response}</p>

              <button
                onClick={enterSite}
                className="bg-white text-black font-bold py-3 px-8 rounded-md hover:bg-gray-200 transition-colors text-lg shadow-lg flex items-center justify-center mx-auto"
              >
                ENTER SITE
                <ArrowRight className="ml-2" size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
