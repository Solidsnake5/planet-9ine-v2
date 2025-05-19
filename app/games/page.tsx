import Image from "next/image"
import Link from "next/link"
import PageHeader from "@/components/page-header"
import GradientText from "@/components/ui/gradient-text"

export default function Games() {
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
            <PageHeader title="GAMES" />
          </div>

          {/* Games content */}
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Tic Tac Toe Game Card */}
              <div className="bg-black/50 backdrop-blur-sm rounded-lg overflow-hidden">
                <div className="relative aspect-video">
                  <Image src="/images/tic-tac-toe.png" alt="Tic Tac Toe" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <h2 className="text-white text-3xl md:text-4xl font-bold">Tic Tac Toe</h2>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-white text-lg mb-6">
                    The classic game of X's and O's. Challenge yourself against <GradientText>PLUTO</GradientText> or
                    play with a friend.
                  </p>
                  <Link
                    href="/games/tic-tac-toe"
                    className="inline-block text-white font-bold py-3 px-6 rounded-md transition-colors hover:opacity-90 bg-gradient-to-b from-[#9D4EDD] to-white/90"
                  >
                    Play Tic Tac Toe
                  </Link>
                </div>
              </div>

              {/* Pig Dice Game Card */}
              <div className="bg-black/50 backdrop-blur-sm rounded-lg overflow-hidden">
                <div className="relative aspect-video">
                  <Image src="/images/dice-game.jpeg" alt="Pig Dice Game" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <h2 className="text-white text-3xl md:text-4xl font-bold">Pig Dice</h2>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-white text-lg mb-6">
                    A game of luck and strategy. Roll the dice to accumulate points, but roll a 1 and lose it all!
                  </p>
                  <Link
                    href="/games/pig-dice"
                    className="inline-block text-white font-bold py-3 px-6 rounded-md transition-colors hover:opacity-90 bg-gradient-to-b from-[#9D4EDD] to-white/90"
                  >
                    Play Pig Dice
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
