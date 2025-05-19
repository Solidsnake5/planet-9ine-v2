import type React from "react"

interface GradientTextProps {
  children: React.ReactNode
  className?: string
}

export default function GradientText({ children, className = "" }: GradientTextProps) {
  return (
    <span
      className={className}
      style={{
        background: "linear-gradient(to bottom, #9D4EDD, white)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {children}
    </span>
  )
}
