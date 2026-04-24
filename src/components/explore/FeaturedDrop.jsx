import { Card } from '../ui/Card'
import { Button } from '../ui/Button'

export function FeaturedDrop({ drop, onView }) {
  if (!drop) return null
  return (
    <Card className="mb-4 bg-navy p-4 text-white">
      <p className="text-xs uppercase tracking-wide text-white/70">Featured Drop</p>
      <h2 className="mt-1 font-display text-xl">{drop.title}</h2>
      <p className="mt-2 text-sm text-white/90">{drop.description}</p>
      <Button className="mt-3" onClick={onView}>See destinations</Button>
    </Card>
  )
}
