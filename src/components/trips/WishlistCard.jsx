import { Trash2 } from 'lucide-react'
import { Card } from '../ui/Card'

export function WishlistCard({ destination, onOpen, onRemove }) {
  return (
    <Card className="overflow-hidden">
      <img src={destination.heroImage} alt={destination.name} className="h-24 w-full object-cover" onClick={onOpen} />
      <div className="flex items-center justify-between p-2">
        <div>
          <p className="text-sm font-semibold">{destination.name}</p>
          <p className="text-xs text-navy/60">{destination.country}</p>
        </div>
        <button onClick={onRemove} className="text-navy/60"><Trash2 size={16} /></button>
      </div>
    </Card>
  )
}
