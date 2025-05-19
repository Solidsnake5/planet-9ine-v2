"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, RotateCcw, Brain, Trophy, Frown, Home } from "lucide-react"
import PageHeader from "@/components/page-header"
import GradientText from "@/components/ui/gradient-text"

type Player = "X" | "O" | null

export default function TicTacToe() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null))
  const [isComputerTurn, setIsComputerTurn] = useState<boolean>(false)
  const [winner, setWinner] = useState<Player>(null)
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [isComputerThinking, setIsComputerThinking] = useState<boolean>(false)
  const [thinkingDots, setThinkingDots] = useState<string>(".")
  const [winningLine, setWinningLine] = useState<number[] | null>(null)

  // Purple color from about page
  const purpleColor = "#9D4EDD"

  // Animate thinking dots
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isComputerThinking) {
      interval = setInterval(() => {
        setThinkingDots((prev) => {
          if (prev === "...") return "."
          return prev + "."
        })
      }, 500)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isComputerThinking])

  // Computer's turn logic
  useEffect(() => {
    if (isComputerTurn && !gameOver) {
      setIsComputerThinking(true)

      // Computer "thinking" delay
      const thinkingTimeout = setTimeout(() => {
        makeComputerMove()
        setIsComputerThinking(false)
        setIsComputerTurn(false)
      }, 2000)

      return () => clearTimeout(thinkingTimeout)
    }
  }, [isComputerTurn, gameOver, board])

  // Check for winner
  useEffect(() => {
    const result = checkWinner(board)
    if (result) {
      const [winnerPlayer, line] = result
      setWinner(winnerPlayer)
      setWinningLine(line)
      setGameOver(true)
    } else if (!board.includes(null)) {
      // If no winner and board is full, it's a draw
      setGameOver(true)
    }
  }, [board])

  // Computer makes a move
  const makeComputerMove = () => {
    // Create a copy of the board
    const newBoard = [...board]

    // Try to win first
    const winningMove = findWinningMove(newBoard, "O")
    if (winningMove !== -1) {
      newBoard[winningMove] = "O"
      setBoard(newBoard)
      return
    }

    // Block player from winning
    const blockingMove = findWinningMove(newBoard, "X")
    if (blockingMove !== -1) {
      newBoard[blockingMove] = "O"
      setBoard(newBoard)
      return
    }

    // Take center if available
    if (newBoard[4] === null) {
      newBoard[4] = "O"
      setBoard(newBoard)
      return
    }

    // Take a corner if available
    const corners = [0, 2, 6, 8]
    const availableCorners = corners.filter((corner) => newBoard[corner] === null)
    if (availableCorners.length > 0) {
      const randomCorner = availableCorners[Math.floor(Math.random() * availableCorners.length)]
      newBoard[randomCorner] = "O"
      setBoard(newBoard)
      return
    }

    // Take any available space
    const availableSpaces = newBoard
      .map((square, index) => (square === null ? index : -1))
      .filter((index) => index !== -1)
    if (availableSpaces.length > 0) {
      const randomSpace = availableSpaces[Math.floor(Math.random() * availableSpaces.length)]
      newBoard[randomSpace] = "O"
      setBoard(newBoard)
    }
  }

  // Find a winning move for the given player
  const findWinningMove = (board: Player[], player: Player): number => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      // Check if two squares have the player's mark and the third is empty
      if (board[a] === player && board[b] === player && board[c] === null) return c
      if (board[a] === player && board[c] === player && board[b] === null) return b
      if (board[b] === player && board[c] === player && board[a] === null) return a
    }

    return -1 // No winning move found
  }

  // Handle player's square click
  const handleClick = (index: number) => {
    // If square is already filled, game is over, or it's computer's turn, do nothing
    if (board[index] || gameOver || isComputerTurn || isComputerThinking) return

    // Create a copy of the board
    const newBoard = [...board]
    // Set the square to X (player)
    newBoard[index] = "X"
    // Update the board
    setBoard(newBoard)

    // Check if game is over after player's move
    const result = checkWinner(newBoard)
    if (result || !newBoard.includes(null)) {
      if (result) {
        const [winnerPlayer, line] = result
        setWinner(winnerPlayer)
        setWinningLine(line)
      }
      setGameOver(true)
      return // Game is over, don't let computer move
    }

    // Now it's computer's turn
    setIsComputerTurn(true)
  }

  // Reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsComputerTurn(false)
    setWinner(null)
    setGameOver(false)
    setIsComputerThinking(false)
    setWinningLine(null)
  }

  // Render a square
  const renderSquare = (index: number) => {
    const isWinningSquare = winningLine?.includes(index)

    return (
      <button
        className={`w-full h-full flex items-center justify-center text-4xl md:text-6xl font-bold border border-white/20 
          ${board[index] === "X" ? "gradient-text" : board[index] === "O" ? "text-white" : "text-transparent"}
          ${isWinningSquare ? "bg-white/30" : "hover:bg-white/10"} 
          transition-colors`}
        onClick={() => handleClick(index)}
        disabled={board[index] !== null || gameOver || isComputerTurn || isComputerThinking}
        style={
          board[index] === "X"
            ? {
                background: "linear-gradient(to bottom, #9D4EDD, white)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }
            : {}
        }
      >
        {board[index] || "."}
      </button>
    )
  }

  // Check for winner and return winning line
  function checkWinner(squares: Player[]): [Player, number[]] | null {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [squares[a], [a, b, c]]
      }
    }
    return null
  }

  // Game status message
  const getStatus = () => {
    if (winner) {
      return winner === "X" ? "You win!" : "Pluto wins!"
    } else if (gameOver) {
      return "Game ended in a draw!"
    } else if (isComputerThinking) {
      return (
        <div className="flex items-center justify-center">
          <Brain className="mr-2 animate-pulse" style={{ color: "#9D4EDD" }} size={20} />
          <span>
            <GradientText>PLUTO</GradientText> thinking{thinkingDots}
          </span>
        </div>
      )
    } else {
      return isComputerTurn ? (
        <>
          <GradientText>PLUTO</GradientText>'s turn
        </>
      ) : (
        "Your turn"
      )
    }
  }

  // Render game over message
  const renderGameOverMessage = () => {
    if (!gameOver) return null

    let icon = <Frown className="w-12 h-12 mb-4" />
    let title = "It's a draw!"
    let message = "Nobody wins this time. Want to try again?"
    let color = "text-white"

    if (winner === "X") {
      icon = <Trophy className="w-12 h-12 mb-4 text-yellow-400" />
      title = "Congratulations!"
      message = (
        <>
          Damn you beat <GradientText>PLUTO</GradientText>..okayyy i see you champ.
        </>
      )
      color = `text-[${purpleColor}]`
    } else if (winner === "O") {
      icon = <Brain className="w-12 h-12 mb-4" />
      title = "Pluto wins"
      message = (
        <>
          You cant beat <GradientText className="font-bold">PLUTO JUNE</GradientText>! Better luck next time.
        </>
      )
    }

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 backdrop-blur-sm animate-in fade-in-50">
        <div className="bg-black/90 border border-white/20 rounded-lg p-6 md:p-8 max-w-md w-[90%] mx-auto text-center">
          <div className="flex justify-center">{icon}</div>
          <h3
            className={`text-xl md:text-2xl font-bold mb-2 ${
              winner === "X" ? "bg-gradient-to-b from-[#9D4EDD] to-white bg-clip-text text-transparent" : "text-white"
            }`}
          >
            {title}
          </h3>
          <p className="text-white/80 mb-6">{message}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetGame}
              className="flex items-center justify-center bg-white text-black font-bold py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
            >
              <RotateCcw className="mr-2" size={20} />
              <span>Play Again</span>
            </button>

            <Link
              href="/games"
              className="flex items-center justify-center bg-gradient-to-b from-[#9D4EDD] to-white/90 text-white font-bold py-2 px-4 rounded-md hover:opacity-90 transition-colors"
            >
              <Home className="mr-2" size={20} />
              <span>Back to Games</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Get the appropriate color for Pluto's name
  const getPlutoNameColor = () => {
    if (gameOver) return "text-white/50"
    if (isComputerThinking) return "text-[#9D4EDD]"
    if (isComputerTurn) return "text-white"
    return "text-white/50"
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
        <main className="flex-1 flex flex-col p-4 md:p-6">
          {/* Back button */}
          <div className="container mx-auto mb-4">
            <Link href="/games" className="inline-flex items-center text-white hover:text-gray-300 transition-colors">
              <ArrowLeft className="mr-2" size={20} />
              <span>Back to Games</span>
            </Link>
          </div>

          {/* Page Header */}
          <div className="container mx-auto mb-6 md:mb-8">
            <PageHeader title="TIC TAC TOE" />
          </div>

          {/* Game container */}
          <div className="container mx-auto max-w-md relative">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 md:p-6">
              {/* Game status */}
              <div className="text-white text-lg md:text-xl lg:text-2xl font-bold text-center mb-4 md:mb-6">
                <div className="mb-2">{getStatus()}</div>
                <div className="flex justify-center gap-4 items-center">
                  <span
                    className={`transition-colors duration-300 ${
                      !isComputerTurn && !gameOver
                        ? "bg-gradient-to-b from-[#9D4EDD] to-white bg-clip-text text-transparent"
                        : "text-white/50"
                    }`}
                  >
                    You (X)
                  </span>
                  <span className="text-white">vs</span>
                  <span
                    className={`transition-colors duration-300 ${
                      isComputerThinking
                        ? "bg-gradient-to-b from-[#9D4EDD] to-white bg-clip-text text-transparent"
                        : isComputerTurn && !gameOver
                          ? "text-white"
                          : "text-white/50"
                    }`}
                  >
                    PLUTO (O)
                  </span>
                </div>
              </div>

              {/* Game board */}
              <div
                className={`aspect-square grid grid-cols-3 grid-rows-3 gap-1 sm:gap-2 bg-black/50 p-1 sm:p-2 rounded-md mb-4 md:mb-6 ${
                  isComputerThinking ? "opacity-70" : ""
                }`}
              >
                {Array(9)
                  .fill(null)
                  .map((_, index) => (
                    <div key={index} className="aspect-square">
                      {renderSquare(index)}
                    </div>
                  ))}
              </div>

              {/* Reset button */}
              <div className="flex justify-center">
                <button
                  onClick={resetGame}
                  className="flex items-center justify-center bg-white text-black font-bold py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <RotateCcw className="mr-2" size={20} />
                  <span>New Game</span>
                </button>
              </div>
            </div>

            {/* Game over overlay */}
            {renderGameOverMessage()}
          </div>
        </main>
      </div>
    </div>
  )
}
