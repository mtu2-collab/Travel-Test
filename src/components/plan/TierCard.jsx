import { Card } from '../ui/Card'

export function TierCard({ tier }) {
  return (
    <Card className="min-w-[220px] p-4">
      <p className="text-xs uppercase text-navy/50">{tier.name}</p>
      <p className="font-display text-2xl text-navy">{tier.price}</p>
      <p className="mt-2 text-sm text-navy/70">{tier.desc}</p>
    </Card>
  )
}
