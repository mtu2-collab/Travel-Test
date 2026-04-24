import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TierCard } from '../components/plan/TierCard'
import { TripMatchForm } from '../components/plan/TripMatchForm'

const tiers = [
  { name: 'Starter', price: '$49', desc: 'AI-assisted itinerary PDF' },
  { name: 'Custom', price: '$299', desc: 'Human-reviewed, fully personalized trip plan' },
  { name: 'White Glove', price: '$999+', desc: 'Full planning + booking + 24/7 support' }
]

export function PlanPage() {
  const [searchParams] = useSearchParams()
  const destination = useMemo(() => searchParams.get('destination') || '', [searchParams])

  return (
    <div>
      <h1 className="font-display text-3xl text-navy">Your dream trip, handled entirely.</h1>
      <p className="mt-2 text-sm text-navy/70">Work with travel designers who manage your trip end-to-end with precision and personality.</p>
      <div className="mt-4 flex gap-3 overflow-x-auto pb-2">{tiers.map((tier) => <TierCard key={tier.name} tier={tier} />)}</div>
      <h2 className="mt-4 mb-2 font-semibold text-navy">Trip Match Request</h2>
      <TripMatchForm prefillDestination={destination} />
    </div>
  )
}
