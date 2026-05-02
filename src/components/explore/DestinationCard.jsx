import { Heart, Star } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'

export function DestinationCard({ destination, saved, onToggleSave, onOpen }) {
  return (
    <Card className="group overflow-hidden transition hover:-translate-y-0.5">
      <button onClick={onOpen} className="relative w-full text-left">
        <img src={destination.heroImage} alt={destination.name} className="h-40 w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
      </button>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <button onClick={onOpen} className="text-left">
            <h3 className="font-semibold text-navy">{destination.name}</h3>
            <p className="text-xs text-navy/70">{destination.country}</p>
          </button>
          <button onClick={onToggleSave} className={`rounded-full p-1.5 transition ${saved ? 'bg-coral/10 text-coral' : 'text-navy/50 hover:bg-navy/5'}`}><Heart size={18} fill={saved ? 'currentColor' : 'none'} /></button>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {destination.vibe.slice(0, 2).map((tag) => <Badge key={tag}>{tag}</Badge>)}
        </div>
        <div className="mt-2 flex items-center gap-1 text-xs text-navy/70"><Star size={14} className="text-coral" />{destination.rating} ({destination.reviewCount})</div>
      </div>
    </Card>
  )
}
