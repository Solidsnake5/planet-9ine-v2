"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, RotateCcw, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Computer } from "lucide-react"
import PageHeader from "@/components/page-header"
import GradientText from "@/components/ui/gradient-text"

type GameMessageType = {
  text: string
  highlight?: string
}

export default function PigDice() {
  const [scores, setScores] = useState<[number, number]>([0, 0])
  const [currentScore, setCurrentScore] = useState<number>(0)
  const [activePlayer, setActivePlayer] = useState<0 | 1>(0)
  const [diceValue, setDiceValue] = useState<number>(1)
  const [isRolling, setIsRolling] = useState<boolean>(false)
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [computerThinking, setComputerThinking] = useState<boolean>(false)
  const [gameMessage, setGameMessage] = useState<GameMessageType | null>(null)
  const [winner, setWinner] = useState<number | null>(null)
  const WINNING_SCORE = 100

  // Purple color from about page
  const purpleColor = "#9D4EDD"

  // Computer AI logic - when the computer is playing
  useEffect(() => {
    // Only run if it's the computer's turn (player 1 is index 0, computer is index 1)
    if (activePlayer === 1 && !gameOver) {
      setComputerThinking(true)

      // Add a message that the computer is thinking
      setGameMessage({ text: "PLUTO is thinking...", highlight: "PLUTO" })

      // Set a delay to make it feel more natural
      const thinkingTime = Math.random() * 1000 + 500 // 500-1500ms thinking time

      const computerTurn = setTimeout(() => {
        // Computer's decision-making logic
        // If current score is high enough or total score is close to winning, hold
        // Otherwise, roll again
        const shouldHold = computerDecideToHold()

        if (shouldHold) {
          setGameMessage({ text: "PLUTO decides to hold", highlight: "PLUTO" })
          // Hold after a short delay
          setTimeout(() => {
            holdScore()
          }, 500)
        } else {
          setGameMessage({ text: "PLUTO decides to roll", highlight: "PLUTO" })
          // Roll after a short delay
          setTimeout(() => {
            rollDice()
          }, 500)
        }

        setComputerThinking(false)
      }, thinkingTime)

      // Clean up the timeout if component unmounts or player changes
      return () => clearTimeout(computerTurn)
    }
  }, [activePlayer, currentScore, gameOver])

  // Computer decision logic
  const computerDecideToHold = () => {
    // Strategy: Hold if current score is 20+ or if total score would win
    // Also, hold if total score + current score is 70+ (getting close to winning)
    // Otherwise, be more aggressive with lower scores

    // If holding would win, always hold
    if (scores[1] + currentScore >= WINNING_SCORE) {
      return true
    }

    // If we have a good amount of points, hold
    if (currentScore >= 20) {
      return true
    }

    // If we're getting close to winning, be more cautious
    if (scores[1] + currentScore >= 70) {
      return Math.random() > 0.3 // 70% chance to hold
    }

    // With lower scores, be more aggressive
    if (currentScore >= 10) {
      return Math.random() > 0.7 // 30% chance to hold
    }

    // With very low scores, almost always roll again
    return Math.random() > 0.9 // 10% chance to hold
  }

  // Roll the dice
  const rollDice = () => {
    if (gameOver || isRolling) return

    setIsRolling(true)
    setGameMessage(null)

    // Simulate dice roll animation
    setTimeout(() => {
      const dice = Math.floor(Math.random() * 6) + 1
      setDiceValue(dice)
      setIsRolling(false)

      if (dice === 1) {
        // Player rolls a 1, lose current score and switch player
        if (activePlayer === 0) {
          setGameMessage({ text: "You rolled a 1! Turn lost." })
        } else {
          setGameMessage({ text: "PLUTO rolled a 1! Turn lost.", highlight: "PLUTO" })
        }
        setTimeout(() => {
          switchPlayer()
        }, 1000)
      } else {
        // Add dice value to current score
        setCurrentScore(currentScore + dice)
      }
    }, 500)
  }

  // Hold current score and switch player
  const hold = () => {
    if (gameOver || isRolling || computerThinking) return

    setGameMessage({ text: "You decided to hold." })
    holdScore()
  }

  // Common hold logic used by both player and computer
  const holdScore = () => {
    // Add current score to player's total score
    const newScores = [...scores] as [number, number]
    newScores[activePlayer] += currentScore

    // Check if player won
    if (newScores[activePlayer] >= WINNING_SCORE) {
      setScores(newScores)
      setGameOver(true)
      if (activePlayer === 1) {
        setGameMessage({ text: "You cant beat PLUTO ! You crazy !", highlight: "PLUTO" })
      } else {
        setGameMessage({ text: "You win!" })
      }
      return
    }

    // Update scores and switch player
    setScores(newScores)
    switchPlayer()
  }

  // Switch to the other player
  const switchPlayer = () => {
    setCurrentScore(0)
    setActivePlayer(activePlayer === 0 ? 1 : 0)
  }

  // Reset the game
  const resetGame = () => {
    setScores([0, 0])
    setCurrentScore(0)
    setActivePlayer(0) // Always start with the human player
    setDiceValue(1)
    setGameOver(false)
    setGameMessage(null)
    setWinner(null)
  }

  // Render dice based on value
  const renderDice = () => {
    const diceComponents = [
      <Dice1 key={1} size={64} style={{ color: purpleColor }} />,
      <Dice2 key={2} size={64} style={{ color: purpleColor }} />,
      <Dice3 key={3} size={64} style={{ color: purpleColor }} />,
      <Dice4 key={4} size={64} style={{ color: purpleColor }} />,
      <Dice5 key={5} size={64} style={{ color: purpleColor }} />,
      <Dice6 key={6} size={64} style={{ color: purpleColor }} />,
    ]

    return <div className={`${isRolling ? "animate-spin" : ""}`}>{diceComponents[diceValue - 1]}</div>
  }

  // Render game message with proper highlighting
  const renderGameMessage = () => {
    if (!gameMessage) return null

    if (!gameMessage.highlight) {
      return <div className="text-white/80 text-center mb-6">{gameMessage.text}</div>
    }

    const parts = gameMessage.text.split(gameMessage.highlight)

    return (
      <div className="text-white/80 text-center mb-6">
        {parts[0]}
        <GradientText className="font-bold">{gameMessage.highlight}</GradientText>
        {parts[1]}
      </div>
    )
  }

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
          {/* Back button */}
          <div className="container mx-auto mb-4">
            <Link href="/games" className="inline-flex items-center text-white hover:text-gray-300 transition-colors">
              <ArrowLeft className="mr-2" size={20} />
              Back to Games
            </Link>
          </div>

          {/* Page Header */}
          <div className="container mx-auto mb-8">
            <PageHeader title="PIG DICE GAME" />
          </div>

          {/* Game container */}
          <div className="container mx-auto max-w-2xl">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6">
              {/* Game status */}
              <div className="text-white text-xl md:text-2xl font-bold text-center mb-2">
                {gameOver ? (
                  activePlayer === 0 ? (
                    "You win!"
                  ) : (
                    <>
                      You cant beat <GradientText>PLUTO</GradientText> ! You crazy !
                    </>
                  )
                ) : activePlayer === 0 ? (
                  "Your turn"
                ) : (
                  <>
                    <GradientText>PLUTO</GradientText>'s turn
                  </>
                )}
              </div>

              {/* Game message */}
              {renderGameMessage()}

              {/* Player scores */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {/* Player 1 (Human) */}
                <div className={`p-4 rounded-lg ${activePlayer === 0 && !gameOver ? "bg-white/20" : "bg-black/30"}`}>
                  <h3 className="text-white text-lg font-bold mb-2 flex items-center">You (Player 1)</h3>
                  <p className="text-3xl font-bold" style={{ color: purpleColor }}>
                    {scores[0]}
                  </p>
                  {activePlayer === 0 && !gameOver && (
                    <p className="mt-2" style={{ color: purpleColor }}>
                      Current: {currentScore}
                    </p>
                  )}
                </div>

                {/* Player 2 (Computer) */}
                <div className={`p-4 rounded-lg ${activePlayer === 1 && !gameOver ? "bg-white/20" : "bg-black/30"}`}>
                  <h3 className="text-white text-lg font-bold mb-2 flex items-center">
                    <GradientText>PLUTO</GradientText> <Computer size={16} className="ml-2" />
                  </h3>
                  <p className="text-3xl font-bold" style={{ color: purpleColor }}>
                    {scores[1]}
                  </p>
                  {activePlayer === 1 && !gameOver && (
                    <p className="mt-2" style={{ color: purpleColor }}>
                      Current: {currentScore}
                    </p>
                  )}
                </div>
              </div>

              {/* Dice */}
              <div className="flex justify-center mb-8">{renderDice()}</div>

              {/* Game controls */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={rollDice}
                  disabled={gameOver || isRolling || activePlayer === 1 || computerThinking}
                  className="bg-white text-black font-bold py-2 px-4 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Roll Dice
                </button>
                <button
                  onClick={hold}
                  disabled={gameOver || isRolling || currentScore === 0 || activePlayer === 1 || computerThinking}
                  className="bg-white text-black font-bold py-2 px-4 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Hold
                </button>
                <button
                  onClick={resetGame}
                  className="flex items-center bg-white text-black font-bold py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <RotateCcw className="mr-2" size={20} />
                  New Game
                </button>
              </div>

              {/* Game rules */}
              <div className="mt-8 p-4 bg-black/30 rounded-lg">
                <h3 className="text-white text-lg font-bold mb-2">Rules:</h3>
                <ul className="text-white/80 list-disc pl-5 space-y-1">
                  <li>Roll the dice to accumulate points in your current score</li>
                  <li>
                    If you roll a 1, you lose your current score and it's <GradientText>PLUTO</GradientText>'s turn
                  </li>
                  <li>Click "Hold" to add your current score to your total and pass the turn</li>
                  <li>First to reach {WINNING_SCORE} points wins!</li>
                  <li>
                    <GradientText>PLUTO</GradientText> will automatically take his turn after you
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
