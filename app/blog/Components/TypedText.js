"use client"
import React, { useEffect, useState } from "react"

const sentences = [
  "Explore the latest tech insights 💻",
  "Discover stories that inspire ✨",
  "Learn. Share. Grow. 🌱",
]

const TypedText = () => {
  const [text, setText] = useState("")
  const [sentenceIndex, setSentenceIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentSentence = sentences[sentenceIndex]
    let typingSpeed = isDeleting ? 50 : 100

    const type = setTimeout(() => {
      if (!isDeleting && charIndex < currentSentence.length) {
        setText(currentSentence.substring(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      } else if (isDeleting && charIndex > 0) {
        setText(currentSentence.substring(0, charIndex - 1))
        setCharIndex(charIndex - 1)
      } else {
        if (!isDeleting) {
          setTimeout(() => setIsDeleting(true), 1500) // Pause before deleting
        } else {
          setIsDeleting(false)
          setSentenceIndex((sentenceIndex + 1) % sentences.length)
        }
      }
    }, typingSpeed)

    return () => clearTimeout(type)
  }, [charIndex, isDeleting, sentenceIndex])

  return (
    <span className="text-lg sm:text-2xl font-medium text-gray-200">
      {text}
      <span className="animate-pulse">|</span>
    </span>
  )
}

export default TypedText
