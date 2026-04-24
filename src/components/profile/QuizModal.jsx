import { useMemo, useState } from 'react'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'

const questions = [
  {
    prompt: 'Your ideal morning?',
    options: [
      { label: 'Slow cafe and street wander', type: 'The Slow Wanderer' },
      { label: 'Chase whatever is happening downtown', type: 'The Chaos Collector' },
      { label: 'Spa breakfast and no stress', type: 'The Comfort Seeker' },
      { label: 'Trail run before sunrise', type: 'The Adventure Junkie' }
    ]
  },
  {
    prompt: 'Pick your evening plan:',
    options: [
      { label: 'Golden hour photo walk', type: 'The Slow Wanderer' },
      { label: 'Bar hop and find live music', type: 'The Chaos Collector' },
      { label: 'Reservation at a top-rated spot', type: 'The Comfort Seeker' },
      { label: 'Night hike or activity tour', type: 'The Adventure Junkie' }
    ]
  },
  {
    prompt: 'Your must-do in a new city?',
    options: [
      { label: 'Museum + food history deep dive', type: 'The Culture Seeker' },
      { label: 'Stack as many experiences as possible', type: 'The Chaos Collector' },
      { label: 'Find the best hotel and views', type: 'The Comfort Seeker' },
      { label: 'Book the most physical excursion', type: 'The Adventure Junkie' }
    ]
  },
  {
    prompt: 'What do you spend most on?',
    options: [
      { label: 'Long stays and hidden gems', type: 'The Slow Wanderer' },
      { label: 'Spontaneous events and tickets', type: 'The Chaos Collector' },
      { label: 'Convenience and upgrades', type: 'The Comfort Seeker' },
      { label: 'Gear and guided adventures', type: 'The Adventure Junkie' }
    ]
  },
  {
    prompt: 'What souvenir matters most?',
    options: [
      { label: 'A local cookbook or art print', type: 'The Culture Seeker' },
      { label: 'Unexpected stories from wild nights', type: 'The Chaos Collector' },
      { label: 'A premium keepsake', type: 'The Comfort Seeker' },
      { label: 'Proof you conquered something new', type: 'The Adventure Junkie' }
    ]
  }
]

const tieBreakerOrder = ['The Culture Seeker', 'The Slow Wanderer', 'The Chaos Collector', 'The Comfort Seeker', 'The Adventure Junkie']

export function QuizModal({ open, onClose, onComplete }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])

  const done = step >= questions.length

  const result = useMemo(() => {
    const counts = {}
    answers.forEach((type) => {
      counts[type] = (counts[type] || 0) + 1
    })

    const ranked = Object.entries(counts).sort((a, b) => b[1] - a[1])
    if (!ranked.length) return 'The Culture Seeker'

    const topScore = ranked[0][1]
    const tied = ranked.filter((item) => item[1] === topScore).map((item) => item[0])
    if (tied.length === 1) return tied[0]

    return tieBreakerOrder.find((type) => tied.includes(type)) || 'The Culture Seeker'
  }, [answers])

  const selectOption = (type) => {
    setAnswers((prev) => [...prev, type])
    setStep((prev) => prev + 1)
  }

  const reset = () => {
    setStep(0)
    setAnswers([])
  }

  return (
    <Modal
      open={open}
      onClose={() => {
        reset()
        onClose()
      }}
      title="Traveler Type Quiz"
    >
      {!done ? (
        <>
          <p className="text-xs text-navy/60">Question {step + 1} of 5</p>
          <h4 className="mt-1 font-semibold text-navy">{questions[step].prompt}</h4>
          <div className="mt-3 grid gap-2">
            {questions[step].options.map((option) => (
              <Button key={option.label} variant="ghost" onClick={() => selectOption(option.type)}>{option.label}</Button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h4 className="font-display text-xl">You are: {result}</h4>
          <p className="mt-2 text-sm text-navy/70">We recalibrated your travel archetype based on your quiz answers.</p>
          <Button
            className="mt-4 w-full"
            onClick={() => {
              onComplete(result)
              reset()
              onClose()
            }}
          >
            Save result
          </Button>
        </>
      )}
    </Modal>
  )
}
