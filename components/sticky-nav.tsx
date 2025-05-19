"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Instagram, Mail, Hexagon, Menu, X } from "lucide-react"

export default function StickyNav() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Don't show on homepage or entry page
  if (pathname === "/" || pathname === "/entry") return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
      {/* Top quote bar */}
      <div className="bg-black px-6 py-2 flex justify-between items-center">
        <p className="text-white text-sm md:text-base">"EARTH WAS FULL, SO I MOVED TO PLANET-9INE."</p>
        <div className="flex items-center gap-4">
          <Link
            href="https://www.instagram.com/pl9nine/"
            className="text-white hover:text-gray-300 transition-colors"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram size={20} />
          </Link>
          <Link
            href="https://artstation.com"
            className="text-white hover:text-gray-300 transition-colors"
            aria-label="Artstation"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Hexagon size={20} />
          </Link>
          <Link href="/contact" className="text-white hover:text-gray-300 transition-colors" aria-label="Contact">
            <Mail size={20} />
          </Link>
        </div>
      </div>

      {/* Divider line */}
      <div className="h-px bg-white/20"></div>

      {/* Main navigation */}
      <div
        className={`bg-black px-6 py-4 flex justify-between items-center transition-all duration-300 ${scrolled ? "shadow-lg" : ""}`}
      >
        <Link href="/" className="text-white text-3xl md:text-4xl font-bold">
          PLANET9INE
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/everydays"
            className={`text-white text-lg font-bold hover:text-gray-300 transition-colors ${pathname === "/everydays" ? "text-gray-300" : ""}`}
          >
            EVERYDAYS
          </Link>
          <Link
            href="/digital-art"
            className={`text-white text-lg font-bold hover:text-gray-300 transition-colors ${pathname === "/digital-art" ? "text-gray-300" : ""}`}
          >
            DIGITAL ART
          </Link>
          <Link
            href="/games"
            className={`text-white text-lg font-bold hover:text-gray-300 transition-colors ${pathname === "/games" ? "text-gray-300" : ""}`}
          >
            GAMES
          </Link>
          <Link
            href="/about"
            className={`text-white text-lg font-bold hover:text-gray-300 transition-colors ${pathname === "/about" ? "text-gray-300" : ""}`}
          >
            ABOUT
          </Link>
          <Link
            href="/contact"
            className={`text-white text-lg font-bold hover:text-gray-300 transition-colors ${pathname === "/contact" ? "text-gray-300" : ""}`}
          >
            CONTACT
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black z-50 border-t border-white/10">
          <nav className="flex flex-col p-4">
            <Link
              href="/everydays"
              className={`text-white text-lg font-bold py-3 hover:text-gray-300 transition-colors ${pathname === "/everydays" ? "text-gray-300" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              EVERYDAYS
            </Link>
            <Link
              href="/digital-art"
              className={`text-white text-lg font-bold py-3 hover:text-gray-300 transition-colors ${pathname === "/digital-art" ? "text-gray-300" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              DIGITAL ART
            </Link>
            <Link
              href="/games"
              className={`text-white text-lg font-bold py-3 hover:text-gray-300 transition-colors ${pathname === "/games" ? "text-gray-300" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              GAMES
            </Link>
            <Link
              href="/about"
              className={`text-white text-lg font-bold py-3 hover:text-gray-300 transition-colors ${pathname === "/about" ? "text-gray-300" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              ABOUT
            </Link>
            <Link
              href="/contact"
              className={`text-white text-lg font-bold py-3 hover:text-gray-300 transition-colors ${pathname === "/contact" ? "text-gray-300" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              CONTACT
            </Link>
          </nav>
        </div>
      )}
    </div>
  )
}
