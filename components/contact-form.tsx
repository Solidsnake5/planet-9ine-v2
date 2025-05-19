"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import GradientText from "@/components/ui/gradient-text"

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission delay
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      // Reset form after submission
      setFormState({
        name: "",
        email: "",
        message: "",
      })
    }, 1500)
  }

  if (isSubmitted) {
    return (
      <div className="bg-black/50 backdrop-blur-sm rounded-md p-8 max-w-xl text-center">
        <h3 className="text-white text-2xl font-bold mb-4">Message Sent to Planet-9ine! 🚀</h3>
        <p className="text-white text-lg mb-8">
          The message is much appreciated and Thank YOU for visiting{" "}
          <GradientText className="font-bold">PLANET9INE</GradientText>.
        </p>
        <p className="text-white text-lg mb-8">Oh and thnx for f***** w/ me btw :)</p>
        <Button
          onClick={() => setIsSubmitted(false)}
          className="bg-gradient-to-b from-[#9D4EDD] to-white/90 text-white hover:opacity-90"
        >
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="block text-white text-sm font-medium mb-1">
          Name
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formState.name}
          onChange={handleChange}
          placeholder="Your name"
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-white text-sm font-medium mb-1">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
          placeholder="your.email@example.com"
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          required
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-white text-sm font-medium mb-1">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          value={formState.message}
          onChange={handleChange}
          placeholder="Your message"
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[150px]"
          required
        />
      </div>

      <Button type="submit" className="w-full bg-white text-black hover:bg-white/90" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "DONT BE SHY"}
      </Button>
    </form>
  )
}
