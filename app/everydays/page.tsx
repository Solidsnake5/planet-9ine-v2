import EverydaysHero from "@/components/everydays-hero"
import ArtworkGrid from "@/components/artwork-grid"
import PageHeader from "@/components/page-header"

// Full artwork data collection
const allArtworks = [
  // Sketch images
  { id: "sketch-1", title: "Face Study", imageUrl: "/images/artwork-sketch-1.jpeg" },
  { id: "sketch-2", title: "Action Explosion", imageUrl: "/images/artwork-sketch-2.jpeg" },
  { id: "sketch-3", title: "Anime Characters", imageUrl: "/images/artwork-sketch-3.jpeg" },
  { id: "sketch-batman", title: "Batman Portrait", imageUrl: "/images/artwork-sketch-batman.jpeg" },
  // Original artwork images
  { id: "1", title: "Character with Sword", imageUrl: "/images/artwork-1.png" },
  { id: "2", title: "Armored Character", imageUrl: "/images/artwork-2.png" },
  { id: "3", title: "Explosive Action", imageUrl: "/images/artwork-3.png" },
  { id: "4", title: "Batman", imageUrl: "/images/artwork-4.png" },
  { id: "5", title: "Reclining Character", imageUrl: "/images/artwork-5.png" },
  { id: "6", title: "Portrait Study", imageUrl: "/images/artwork-6.png" },
  { id: "7", title: "Character with Hat", imageUrl: "/images/artwork-7.png" },
]

// Select only the first 8 artworks to display
const displayArtworks = allArtworks.slice(0, 8)

export default function Everydays() {
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
          {/* Page Header */}
          <div className="container mx-auto px-6 py-8">
            <PageHeader title="EVERYDAYS" />
          </div>

          {/* Hero section */}
          <EverydaysHero />

          {/* Artwork Grid - Limited to 8 items */}
          <ArtworkGrid title="RECENT ARTWORK" count={8} artworks={displayArtworks} />
        </main>
      </div>
    </div>
  )
}
