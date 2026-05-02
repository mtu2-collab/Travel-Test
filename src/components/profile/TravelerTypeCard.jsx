import { Card } from '../ui/Card'
import { Button } from '../ui/Button'

export function TravelerTypeCard({ type, detail, onRetake }) {
  if (!type || !detail) return null
  return (
    <Card className="mt-4 bg-navy p-4 text-white">
      <p className="text-xs text-white/70">Traveler Archetype</p>
      <h3 className="font-display text-xl">{type}</h3>
      <p className="mt-1 text-sm text-white/90">{detail.description}</p>
      <ul className="mt-2 list-inside list-disc text-sm text-white/85">
        {detail.traits.map((t) => <li key={t}>{t}</li>)}
      </ul>
      <Button variant="link" className="mt-3 text-white" onClick={onRetake}>Retake Quiz</Button>
    </Card>
  )
}
