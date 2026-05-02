import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteTrip, getCompletedTrips, getSavedTrips } from '../api/trips'
import { StatBar } from '../components/trips/StatBar'
import { TripStamp } from '../components/trips/TripStamp'
import { WishlistCard } from '../components/trips/WishlistCard'
import { Button } from '../components/ui/Button'
import { Skeleton } from '../components/ui/Skeleton'
import { useUser } from '../context/UserContext.jsx'

export function TripsPage() {
  const navigate = useNavigate()
  const { user, refreshUser } = useUser()
  const [tab, setTab] = useState('wishlist')
  const [saved, setSaved] = useState([])
  const [completed, setCompleted] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    setError('')
    const [s, c] = await Promise.all([getSavedTrips('user-1'), getCompletedTrips('user-1')])
    if (s.error || c.error) setError(s.error || c.error)
    setSaved(s.data || [])
    setCompleted(c.data || [])
    setLoading(false)
  }

  useEffect(() => {
    if (user) load()
  }, [user])

  const remove = async (id) => {
    await deleteTrip(id)
    await refreshUser()
    load()
  }

  return (
    <div>
      <div className="mb-3 flex gap-2">
        <button className={`rounded-full px-3 py-1 text-sm ${tab === 'wishlist' ? 'bg-coral text-white' : 'bg-white'}`} onClick={() => setTab('wishlist')}>Wishlist</button>
        <button className={`rounded-full px-3 py-1 text-sm ${tab === 'been' ? 'bg-coral text-white' : 'bg-white'}`} onClick={() => setTab('been')}>Been There</button>
      </div>

      <StatBar stats={[{ label: 'Countries Visited', value: user?.countriesVisited || 0 }, { label: 'Destinations Saved', value: user?.wishlist?.length || 0 }, { label: 'Trips Completed', value: user?.completedTrips?.length || 0 }]} />

      {error ? <div className="mb-3 rounded-xl bg-red-50 p-3 text-sm text-red-600">{error} <Button variant="ghost" className="ml-2" onClick={load}>Retry</Button></div> : null}
      {loading ? <div className="grid grid-cols-2 gap-3">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-2xl" />)}</div> : null}

      {!loading && tab === 'wishlist' ? (
        saved.length ? <div className="grid grid-cols-2 gap-3">{saved.map((d) => <WishlistCard key={d.id} destination={d} onOpen={() => navigate(`/destination/${d.id}`)} onRemove={() => remove(d.id)} />)}</div> : <div className="rounded-2xl bg-white p-4 text-sm">No saved trips yet. <button className="text-coral underline" onClick={() => navigate('/explore')}>Explore destinations</button></div>
      ) : null}

      {!loading && tab === 'been' ? (
        completed.length ? <div className="grid gap-3">{completed.map((t, i) => <TripStamp key={`${t.destinationId}-${i}`} trip={t} />)}</div> : <div className="rounded-2xl bg-white p-4 text-sm">Your passport is waiting for the first stamp.</div>
      ) : null}
    </div>
  )
}
