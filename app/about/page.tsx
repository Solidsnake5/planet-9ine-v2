import Image from "next/image"
import Link from "next/link"
import PageHeader from "@/components/page-header"

export default function About() {
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
        <main className="flex-1 flex flex-col p-6">
          {/* Page Header */}
          <div className="container mx-auto mb-8">
            <PageHeader title="ABOUT" />
          </div>

          {/* About content */}
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              {/* Left column - Image */}
              <div className="w-full">
                <Image
                  src="/images/artist-gallery.jpeg"
                  alt="Artist viewing abstract art in gallery"
                  width={600}
                  height={800}
                  className="w-full h-auto"
                />
              </div>

              {/* Right column - Text content */}
              <div className="text-white">
                <h2 className="text-5xl md:text-6xl font-bold mb-6">
                  I AM{" "}
                  <span
                    style={{
                      background: "linear-gradient(to bottom, #9D4EDD, white)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    PLUTO JUNE
                  </span>
                </h2>

                <p className="text-lg md:text-xl mb-12">
                  All this began as a means of getting a grasp on the fundamentals involved in drawing. They say if you
                  want to become a better artist you have to do art shit everyday so ..there you go.
                </p>

                <div className="mt-auto">
                  <h3 className="text-3xl font-bold mb-4">CONNECT</h3>

                  <div className="space-y-2">
                    <Link
                      href="https://www.instagram.com/pl9nine/"
                      className="block text-xl hover:text-gray-300 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      INSTAGRAM
                    </Link>

                    <Link
                      href="https://artstation.com"
                      className="block text-xl hover:text-gray-300 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ARTSTATION
                    </Link>

                    <Link href="/contact" className="block text-xl hover:text-gray-300 transition-colors">
                      CONTACT
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
