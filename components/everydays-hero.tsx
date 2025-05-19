import Image from "next/image"

export default function EverydaysHero() {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          {/* Artwork grid */}
          <div className="w-full md:w-1/2">
            <Image
              src="/images/artwork-collage.jpeg"
              alt="365 days of art collage"
              width={600}
              height={600}
              className="w-full h-auto"
            />
          </div>

          {/* Text content */}
          <div className="w-full md:w-1/2 text-white text-center md:text-left">
            <h2 className="text-7xl md:text-8xl font-bold">365</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-8">days of art</h3>

            <p className="text-lg md:text-xl mb-6">
              I began 365 consecutive days of art in 2020 as a means to improve my artistic abilities and rediscover my
              natural passion and drive for the arts.
            </p>

            <p className="text-lg md:text-xl">
              what you see before you is the result of daily practice and improvement. So go look at some of my
              ish...and dont be shy to comment.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
