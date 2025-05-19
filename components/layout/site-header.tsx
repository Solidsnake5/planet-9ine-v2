import Link from "next/link"
import { Instagram, Mail } from "lucide-react"

export default function SiteHeader() {
  return (
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
  )
}
