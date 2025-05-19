"use client"

import type React from "react"

import { useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ArtworkModalProps {
  isOpen: boolean
  onClose: () => void
  artwork: {
    id: string
    title: string
    imageUrl: string
  } | null
  currentIndex: number
  totalCount: number
  onPrevious: () => void
  onNext: () => void
}

export default function ArtworkModal({
  isOpen,
  onClose,
  artwork,
  currentIndex,
  totalCount,
  onPrevious,
  onNext,
}: ArtworkModalProps) {
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrevious()
      if (e.key === "ArrowRight") onNext()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      // Prevent scrolling of the background content
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose, onPrevious, onNext])

  if (!isOpen || !artwork) return null

  // Close modal on background click
  const handleBackgroundClick = () => {
    onClose()
  }

  // Prevent clicks on the modal content from closing the modal
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={handleBackgroundClick}>
      <div className="relative flex flex-col justify-center items-center">
        {/* Container for image and navigation - wider to accommodate buttons */}
        <div className="relative flex items-center justify-center w-full px-16">
          {/* Navigation arrows - positioned outside the image */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onPrevious()
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Previous image"
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={24} className="text-black" />
          </button>

          {/* Artwork image container */}
          <div className="max-w-[600px] w-full bg-[#f5f5f5]" onClick={handleContentClick}>
            <div className="bg-gray-900 flex items-center justify-center" style={{ height: "400px" }}>
              <Image
                src={artwork.imageUrl || "/placeholder.svg"}
                alt={artwork.title}
                width={600}
                height={600}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Image counter */}
            <div className="w-full bg-black py-2">
              <p className="text-white text-center">
                {currentIndex + 1}/{totalCount}
              </p>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Next image"
            disabled={currentIndex === totalCount - 1}
          >
            <ChevronRight size={24} className="text-black" />
          </button>
        </div>
      </div>
    </div>
  )
}
