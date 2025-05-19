import Image from "next/image"

// Reusable page header component
export function PageHeader({ title }: { title: string }) {
  return <h1 className="text-white text-6xl md:text-8xl font-bold mb-6">{title}</h1>
}

export default function DigitalArtHero() {
  return (
    <section className="w-full relative py-16 md:py-24 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/artwork-collage.jpeg"
          alt="Artwork collage background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl">
          <PageHeader title="DIGITAL ART" />

          <p className="text-white text-xl md:text-2xl mb-4">Coming soon. Check back later for digital artwork.</p>

          <p className="text-white text-xl md:text-2xl">:(</p>
        </div>
      </div>
    </section>
  )
}
