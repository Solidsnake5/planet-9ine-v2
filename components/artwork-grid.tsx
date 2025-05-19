"use client"

import { useState } from "react"
import Image from "next/image"
import ArtworkModal from "./artwork-modal"

interface Artwork {
  id: string
  title: string
  imageUrl: string
}

interface ArtworkGridProps {
  title?: string
  count?: number
  artworks: Artwork[]
}

export default function ArtworkGrid({ title = "RECENT ARTWORK", count, artworks }: ArtworkGridProps) {
  // Update the filtering logic to be more strict about what constitutes a valid image
  const validArtworks = artworks.filter((artwork) => {
    // Check if the imageUrl exists, is not a placeholder, and points to an actual image file
    return (
      artwork.imageUrl &&
      !artwork.imageUrl.includes("placeholder") &&
      (artwork.imageUrl.includes(".jpeg") ||
        artwork.imageUrl.includes(".jpg") ||
        artwork.imageUrl.includes(".png") ||
        artwork.imageUrl.includes(".gif"))
    )
  })

  const [selectedArtworkIndex, setSelectedArtworkIndex] = useState<number>(-1)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (index: number) => {
    setSelectedArtworkIndex(index)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const goToPrevious = () => {
    if (selectedArtworkIndex > 0) {
      setSelectedArtworkIndex(selectedArtworkIndex - 1)
    }
  }

  const goToNext = () => {
    if (selectedArtworkIndex < validArtworks.length - 1) {
      setSelectedArtworkIndex(selectedArtworkIndex + 1)
    }
  }

  // Update the actual count to match the number of valid artworks
  const actualCount = validArtworks.length

  return (
    <section className="w-full bg-black py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-white text-4xl md:text-5xl font-bold">{title}</h2>
          {<p className="text-white text-lg">Showing {actualCount} pieces</p>}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {validArtworks.map((artwork, index) => (
            <div
              key={artwork.id}
              onClick={() => openModal(index)}
              className="block aspect-square overflow-hidden hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-white/50 relative cursor-pointer"
            >
              <Image
                src={artwork.imageUrl || "/placeholder.svg"}
                alt={artwork.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Artwork Modal */}
      <ArtworkModal
        isOpen={isModalOpen}
        onClose={closeModal}
        artwork={selectedArtworkIndex >= 0 ? validArtworks[selectedArtworkIndex] : null}
        currentIndex={selectedArtworkIndex}
        totalCount={validArtworks.length}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />
    </section>
  )
}
