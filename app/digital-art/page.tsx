import DigitalArtHero from "@/components/digital-art-hero"

// Sample digital art data - this would be replaced with actual data
const digitalArtworks = [
  { id: "digital-1", title: "Digital Artwork 1", imageUrl: "/images/digital-1.png" },
  { id: "digital-2", title: "Digital Artwork 2", imageUrl: "/images/digital-2.png" },
  { id: "digital-3", title: "Digital Artwork 3", imageUrl: "/images/digital-3.jpg" },
  { id: "digital-4", title: "Digital Artwork 4", imageUrl: "/images/digital-4.jpg" },
  { id: "digital-5", title: "Digital Artwork 5", imageUrl: "/images/digital-5.jpg" },
  { id: "digital-6", title: "Digital Artwork 6", imageUrl: "/images/digital-6.jpg" },
  { id: "digital-7", title: "Digital Artwork 7", imageUrl: "/images/digital-7.jpg" },
  { id: "digital-8", title: "Digital Artwork 8", imageUrl: "/images/digital-8.jpg" },
  { id: "digital-9", title: "Digital Artwork 9", imageUrl: "/images/digital-9.jpg" },
  { id: "digital-10", title: "Digital Artwork 10", imageUrl: "/images/digital-10.jpg" },
  { id: "digital-11", title: "Digital Artwork 11", imageUrl: "/images/digital-11.jpg" },
  { id: "digital-12", title: "Digital Artwork 12", imageUrl: "/images/digital-12.jpg" },
]

export default function DigitalArt() {
  return (
    <div className="min-h-screen relative pt-[120px]">
      {/* Background image overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/artwork-collage.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlend: "multiply",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Main content */}
        <main className="flex-1 flex flex-col">
          {/* Hero section */}
          <DigitalArtHero />

          {/* Artwork Grid - Commented out as per the "coming soon" message
          <ArtworkGrid title="DIGITAL CREATIONS" count={12} artworks={digitalArtworks} />
          */}
        </main>
      </div>
    </div>
  )
}
