import { useMemo, useState } from 'react'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'

const questions = [
  ['Your ideal morning?', ['Slow cafe', 'City sprint', 'Spa breakfast', 'Mountain trail']],
  ['Pick a night plan:', ['Sunset walk', 'Street market', 'Fine dining', 'Live music crawl']],
  ['Trip pace?', ['Slow', 'Fast', 'Balanced', 'Intense']],
  ['Biggest priority?', ['Depth', 'Novelty', 'Comfort', 'Thrill']],
  ['Souvenir style?', ['Notebook', 'Random finds', 'Luxury item', 'Action photos']]
]
const map = ['The Slow Wanderer', 'The Chaos Collector', 'The Comfort Seeker', 'The Adventure Junkie']

export function QuizModal({ open, onClose, onComplete }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])

  const question = questions[step]
  const done = step >= questions.length

  const result = useMemo(() => {
    const counts = {}
    answers.forEach((a) => { counts[map[a]] = (counts[map[a]] || 0) + 1 })
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'The Culture Seeker'
  }, [answers])

  return (
    <Modal open={open} onClose={onClose} title="Traveler Type Quiz">
      {!done ? (
        <>
          <p className="text-xs text-navy/60">Question {step + 1} of 5</p>
          <h4 className="mt-1 font-semibold text-navy">{question[0]}</h4>
          <div className="mt-3 grid gap-2">
            {question[1].map((opt, index) => <Button key={opt} variant="ghost" onClick={() => { setAnswers((a) => [...a, index]); setStep((s) => s + 1) }}>{opt}</Button>)}
          </div>
        </>
      ) : (
        <>
          <h4 className="font-display text-xl">You are: {result}</h4>
          <p className="mt-2 text-sm text-navy/70">We recalibrated your travel archetype based on your picks.</p>
          <Button className="mt-4 w-full" onClick={() => { onComplete(result); onClose(); setStep(0); setAnswers([]) }}>Save result</Button>
        </>
      )}
    </Modal>
  )
}
