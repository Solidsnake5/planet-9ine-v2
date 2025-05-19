import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// This would be replaced with actual data fetching
const getArtwork = (id: string) => {
  // Sample data - in a real app, this would fetch from an API or database
  return {
    id,
    title: `Artwork ${id}`,
    imageUrl: `/images/artwork-${id}.jpg`,
    description:
      "This is a detailed description of the artwork. It would include information about the medium, inspiration, and process behind creating this piece.",
    date: "January 15, 2020",
  }
}

export default function ArtworkPage({ params }: { params: { id: string } }) {
  const artwork = getArtwork(params.id)

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
        <main className="flex-1 container mx-auto px-6 py-8">
          <Link
            href="/everydays"
            className="inline-flex items-center text-white mb-6 hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to gallery
          </Link>

          <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <Image
                  src={artwork.imageUrl || "/placeholder.svg"}
                  alt={artwork.title}
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-bold mb-4">{artwork.title}</h1>
                <p className="text-gray-300 mb-2">{artwork.date}</p>
                <p className="mb-6">{artwork.description}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
