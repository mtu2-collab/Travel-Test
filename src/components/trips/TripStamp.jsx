import { Card } from '../ui/Card'

export function TripStamp({ trip }) {
  return (
    <Card className="border-2 border-dashed border-coral/40 p-3">
      <p className="font-semibold text-navy">{trip.destination?.name}</p>
      <p className="text-xs text-navy/60">{trip.destination?.country} · {trip.dateVisited}</p>
      {trip.notes ? <p className="mt-2 text-sm text-navy/80">“{trip.notes}”</p> : null}
    </Card>
  )
}
