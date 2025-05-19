'use client'

interface VideoBackgroundProps {
  onLoadedData?: () => void
}

export default function VideoBackground({ onLoadedData }: VideoBackgroundProps) {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute w-full h-full object-cover"
      onLoadedData={onLoadedData}
    >
      <source src="/videos/space-background.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
} 