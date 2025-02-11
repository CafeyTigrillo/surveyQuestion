"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Smile, SmilePlus, Meh, Frown, FolderOpenIcon as FrownOpen } from "lucide-react"
import Image from "next/image"

interface SurveyQuestion {
  id: 1 | 2 | 3 | 4 | 5
  question: string
  image: string
}

const questions: SurveyQuestion[] = [
  {
    id: 1,
    question: "¿Cómo calificaría la calidad de la comida?",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=300&fit=crop",
  },
  {
    id: 2,
    question: "¿Cómo fue el servicio del personal?",
    image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=500&h=300&fit=crop",
  },
  {
    id: 3,
    question: "¿Qué tan limpio encontró el restaurante?",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop",
  },
  {
    id: 4,
    question: "¿Cómo calificaría la relación calidad-precio?",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop",
  },
  {
    id: 5,
    question: "¿Qué tan probable es que nos recomiende a otros?",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&h=300&fit=crop",
  },
]

export default function SurveyForm() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: Number.parseInt(value),
    }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          restaurant_id: "1",
          question_1: answers[1],
          question_2: answers[2],
          question_3: answers[3],
          question_4: answers[4],
          question_5: answers[5],
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error("Error submitting survey:", error)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop')] bg-cover bg-center bg-fixed">
        <div className="min-h-screen bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg mx-auto backdrop-blur-sm bg-white/90">
            <CardContent className="pt-6">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center space-y-4">
                <div className="flex justify-center">
                  <SmilePlus className="w-16 h-16 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold">¡Gracias por su opinión!</h2>
                <p className="text-muted-foreground">Sus comentarios nos ayudan a mejorar nuestro servicio.</p>
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop')] bg-cover bg-center bg-fixed">
      <div className="min-h-screen bg-black/50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl mx-auto backdrop-blur-sm bg-white/90 overflow-hidden">
          <CardHeader className="text-center relative overflow-hidden pb-0">
            <div className="absolute inset-0 z-0">
              <Image
                src={questions[currentQuestion].image || "/placeholder.svg"}
                alt="Food background"
                width={800}
                height={400}
                className="w-full h-48 object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
            </div>
            <div className="relative z-10 pt-32">
              <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Encuesta de Satisfacción
              </CardTitle>
              <CardDescription className="text-base md:text-lg">Su opinión nos ayuda a mejorar</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="space-y-6 pt-6">
              <div className="flex justify-between mb-4">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-full mx-1 rounded-full transition-colors ${
                      index <= currentQuestion ? "bg-orange-500" : "bg-muted"
                    }`}
                  />
                ))}
              </div>

              <motion.div
                key={currentQuestion}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-medium mb-4 text-center">{questions[currentQuestion].question}</h3>

                <RadioGroup
                  onValueChange={handleAnswer}
                  value={answers[questions[currentQuestion].id]?.toString()}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-4"
                >
                  {[
                    { value: "1", icon: FrownOpen, label: "Muy malo", color: "text-red-500" },
                    { value: "2", icon: Frown, label: "Malo", color: "text-orange-500" },
                    { value: "3", icon: Meh, label: "Regular", color: "text-yellow-500" },
                    { value: "4", icon: Smile, label: "Bueno", color: "text-lime-500" },
                    { value: "5", icon: SmilePlus, label: "Excelente", color: "text-green-500" },
                  ].map(({ value, icon: Icon, label, color }) => (
                    <div key={value} className="text-center">
                      <RadioGroupItem value={value} id={`rating-${value}`} className="peer sr-only" />
                      <Label
                        htmlFor={`rating-${value}`}
                        className="flex flex-col items-center gap-2 rounded-lg border-2 border-muted p-4 hover:bg-white/50 hover:border-orange-200 peer-data-[state=checked]:border-orange-500 peer-data-[state=checked]:bg-orange-50 cursor-pointer transition-all"
                      >
                        <Icon
                          className={`w-6 h-6 md:w-8 md:h-8 ${color} transition-transform hover:scale-110 ${
                            answers[questions[currentQuestion].id]?.toString() === value ? "scale-110" : ""
                          }`}
                        />
                        <span className="text-xs md:text-sm font-medium">{label}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </motion.div>

              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="border-orange-200 hover:bg-orange-50 text-sm md:text-base px-2 py-1 md:px-4 md:py-2"
                >
                  Anterior
                </Button>
                {currentQuestion === questions.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={Object.keys(answers).length !== questions.length}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-sm md:text-base px-2 py-1 md:px-4 md:py-2"
                  >
                    Enviar
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    disabled={!answers[questions[currentQuestion].id]}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-sm md:text-base px-2 py-1 md:px-4 md:py-2"
                  >
                    Siguiente
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

