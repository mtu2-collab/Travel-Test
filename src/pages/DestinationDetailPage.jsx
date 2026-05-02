import { useEffect, useMemo, useState } from 'react'
import { Star } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDestinationById } from '../api/destinations'
import { getItineraryPreview } from '../api/itinerary'
import { markTripComplete } from '../api/trips'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { Skeleton } from '../components/ui/Skeleton'
import { useApi } from '../hooks/useApi'
import { useUser } from '../context/UserContext.jsx'

export function DestinationDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, toggleWishlist, refreshUser } = useUser()
  const { data: destination, loading, error, refetch } = useApi(getDestinationById, [id], true)
  const [preview, setPreview] = useState([])
  const [previewLoading, setPreviewLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [notes, setNotes] = useState('')
  const [dateVisited, setDateVisited] = useState('')
  const [savingTrip, setSavingTrip] = useState(false)
  const [saveError, setSaveError] = useState('')

  const saved = useMemo(() => user?.wishlist?.includes(id), [user, id])

  useEffect(() => {
    setPreviewLoading(true)
    getItineraryPreview(id).then((res) => {
      setPreview(res.data || [])
      setPreviewLoading(false)
    })
  }, [id])

  const completeTrip = async () => {
    setSavingTrip(true)
    setSaveError('')
    const res = await markTripComplete(id, notes, dateVisited)
    if (res.error) {
      setSaveError(res.error)
    } else {
      await refreshUser()
      setOpen(false)
      setNotes('')
      setDateVisited('')
    }
    setSavingTrip(false)
  }

  if (loading) return <Skeleton className="h-96 rounded-2xl" />
  if (error || !destination) {
    return (
      <div className="rounded-xl bg-red-50 p-3 text-sm">
        {error || 'Could not load'} <button className="underline" onClick={refetch}>Retry</button>
      </div>
    )
  }

  return (
    <div>
      <img src={destination.heroImage} alt={destination.name} className="h-64 w-full rounded-3xl object-cover" />
      <h1 className="mt-3 font-display text-3xl text-navy">{destination.name}</h1>
      <p className="text-sm text-navy/70">{destination.country}</p>
      <div className="mt-1 flex items-center gap-1 text-xs text-navy/70">
        <Star size={14} className="text-coral" /> {destination.rating} · {destination.reviewCount} reviews
      </div>
      <div className="mt-2 flex flex-wrap gap-2">{destination.vibe.map((v) => <Badge key={v}>{v}</Badge>)}</div>
      <div className="mt-3 flex gap-2">
        <Button onClick={() => toggleWishlist(id)}>{saved ? 'Saved to Wishlist' : 'Save to Wishlist'}</Button>
        <Button variant="ghost" onClick={() => setOpen(true)}>I&apos;ve Been Here</Button>
      </div>
      <div className="mt-4 flex gap-2 overflow-x-auto">{destination.gallery.map((g) => <img key={g} src={g} alt="gallery" className="h-20 w-28 rounded-xl object-cover" />)}</div>
      <p className="mt-4 text-sm text-navy/80">{destination.description}</p>
      <div className="mt-3 rounded-2xl bg-white p-3 italic text-navy/80">Local tip: {destination.localTip}</div>
      <p className="mt-3 text-sm"><strong>Budget:</strong> {destination.budget}</p>
      <div className="mt-2 text-xs text-navy/70">Best for: {destination.bestFor.join(', ')}</div>
      <div className="mt-2 flex flex-wrap gap-2">{destination.travelerTypes.map((t) => <Badge key={t} className="bg-coral/10 text-coral">{t}</Badge>)}</div>

      <div className="mt-4 rounded-2xl bg-white p-3">
        <h3 className="font-semibold">Teaser Itinerary</h3>
        {previewLoading ? <Skeleton className="mt-2 h-16 rounded-xl" /> : (
          <>
            <p className="mt-1 text-sm">{preview[0]}</p>
            <div className="mt-2 rounded-xl bg-navy/10 p-2 text-xs text-navy/50 blur-[1px]">{preview[1]} · {preview[2]}</div>
          </>
        )}
        <Button className="mt-3 w-full" onClick={() => navigate(`/plan?destination=${encodeURIComponent(destination.name)}`)}>Unlock Full Plan — Let Us Plan This Trip</Button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Mark trip complete">
        {saveError ? <div className="mt-2 rounded-xl bg-red-50 p-2 text-xs text-red-600">{saveError}</div> : null}
        <input className="mt-3 w-full rounded-xl border p-2" placeholder="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} />
        <input type="month" className="mt-2 w-full rounded-xl border p-2" value={dateVisited} onChange={(e) => setDateVisited(e.target.value)} />
        <Button className="mt-3 w-full" onClick={completeTrip} disabled={savingTrip}>{savingTrip ? 'Saving...' : 'Save'}</Button>
      </Modal>
    </div>
  )
}
