"use client"

import { useState } from "react"
import Link from "next/link"
import { Instagram, Mail } from "lucide-react"

// Define background images for each nav item
const navBackgrounds = {
  default: "/images/artwork-collage.jpeg",
  everydays: "/images/artwork-1.png",
  digitalArt: "/images/digital-art-sketch.jpeg",
  games: "/images/artwork-3.png", // Using image 3 from the grid as requested
  about: "/images/artwork-3.png",
  contact: "/images/artwork-4.png",
}

export default function Home() {
  const [bgImage, setBgImage] = useState(navBackgrounds.default)

  // Handle hover events for navigation items
  const handleMouseEnter = (navItem: keyof typeof navBackgrounds) => {
    setBgImage(navBackgrounds[navItem])
  }

  const handleMouseLeave = () => {
    setBgImage(navBackgrounds.default)
  }

  return (
    <div className="min-h-screen relative">
      {/* Background image overlay with transition */}
      <div
        className="absolute inset-0 z-0 transition-all duration-500 ease-in-out"
        style={{
          backgroundImage: `url('${bgImage}')`,
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
        {/* Header with logo and social icons */}
        <header className="w-full px-6 py-4 md:py-6 flex justify-between items-center">
          <Link href="/" className="text-white text-3xl md:text-4xl font-bold">
            PLANET9INE
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="https://www.instagram.com/pl9nine/"
              className="text-white hover:text-gray-300 transition-colors"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={24} />
            </Link>
            <Link href="/contact" className="text-white hover:text-gray-300 transition-colors" aria-label="Contact">
              <Mail size={24} />
            </Link>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex flex-col">
          {/* Navigation sidebar - always in column layout */}
          <nav className="p-4 md:p-6 flex flex-col space-y-4 md:space-y-6">
            <Link
              href="/everydays"
              className="text-white text-lg md:text-3xl font-bold hover:text-gray-300 transition-colors"
              onMouseEnter={() => handleMouseEnter("everydays")}
              onMouseLeave={handleMouseLeave}
            >
              EVERYDAYS
            </Link>
            <Link
              href="/digital-art"
              className="text-white text-lg md:text-3xl font-bold hover:text-gray-300 transition-colors"
              onMouseEnter={() => handleMouseEnter("digitalArt")}
              onMouseLeave={handleMouseLeave}
            >
              DIGITAL ART
            </Link>
            <Link
              href="/games"
              className="text-[#9D4EDD] text-lg md:text-3xl font-bold hover:text-gray-300 transition-colors"
              onMouseEnter={() => handleMouseEnter("games")}
              onMouseLeave={handleMouseLeave}
            >
              GAM
            </Link>
            <Link
              href="/about"
              className="text-white text-lg md:text-3xl font-bold hover:text-gray-300 transition-colors"
              onMouseEnter={() => handleMouseEnter("about")}
              onMouseLeave={handleMouseLeave}
            >
              ABOUT
            </Link>
            <Link
              href="/contact"
              className="text-white text-lg md:text-3xl font-bold hover:text-gray-300 transition-colors"
              onMouseEnter={() => handleMouseEnter("contact")}
              onMouseLeave={handleMouseLeave}
            >
              CONTACT
            </Link>
          </nav>

          {/* Welcome text */}
          <div className="flex-1 p-6 flex items-end">
            <p className="text-white text-base sm:text-lg md:text-xl max-w-3xl">
              Welcome to Planet9ine — the home for some of my best and worst art pieces. Here, we believe that people
              should push the boundaries of creativity and discover what lies beyond perfection: the raw, the absurd,
              the beautifully imperfect. This is a space where exploration triumphs over polish, where ideas run wild,
              and where art becomes a fearless expression of self (damn..that sounded kinda good ). Okay go check out my
              stuff..bye
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
