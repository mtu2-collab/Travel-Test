import { Heart, Star } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'

export function DestinationCard({ destination, saved, onToggleSave, onOpen }) {
  return (
    <Card className="overflow-hidden">
      <button onClick={onOpen} className="w-full text-left">
        <img src={destination.heroImage} alt={destination.name} className="h-36 w-full object-cover" />
      </button>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <button onClick={onOpen} className="text-left">
            <h3 className="font-semibold text-navy">{destination.name}</h3>
            <p className="text-xs text-navy/70">{destination.country}</p>
          </button>
          <button onClick={onToggleSave} className={`rounded-full p-1 ${saved ? 'text-coral' : 'text-navy/50'}`}><Heart size={18} fill={saved ? 'currentColor' : 'none'} /></button>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {destination.vibe.slice(0, 2).map((tag) => <Badge key={tag}>{tag}</Badge>)}
        </div>
        <div className="mt-2 flex items-center gap-1 text-xs text-navy/70"><Star size={14} className="text-coral" />{destination.rating} ({destination.reviewCount})</div>
      </div>
    </Card>
  )
}
