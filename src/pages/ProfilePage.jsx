import { useEffect, useState } from 'react'
import { getTravelerTypeDetails } from '../api/users'
import { TravelerTypeCard } from '../components/profile/TravelerTypeCard'
import { QuizModal } from '../components/profile/QuizModal'
import { Card } from '../components/ui/Card'
import { useUser } from '../context/UserContext.jsx'

export function ProfilePage() {
  const { user, loading, patchUser } = useUser()
  const [bio, setBio] = useState('')
  const [open, setOpen] = useState(false)
  const [typeDetail, setTypeDetail] = useState(null)

  useEffect(() => {
    setBio(user?.bio || '')
  }, [user?.bio])

  useEffect(() => {
    if (!user?.travelerType) return
    getTravelerTypeDetails(user.travelerType).then((res) => setTypeDetail(res.data || null))
  }, [user?.travelerType])

  if (loading) return <Card className="p-4 text-sm">Loading profile...</Card>
  if (!user) return <Card className="p-4 text-sm">Unable to load profile.</Card>

  return (
    <div>
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <img src={user.avatar} alt={user.name} className="h-14 w-14 rounded-full object-cover" />
          <div>
            <h1 className="font-display text-2xl text-navy">{user.name}</h1>
            <p className="text-xs text-coral">{user.travelerType}</p>
          </div>
        </div>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} onBlur={() => patchUser({ bio })} className="mt-3 h-20 w-full rounded-xl border p-2 text-sm" />
        <div className="mt-3 grid grid-cols-3 text-center text-xs">
          <div><p className="font-display text-lg">{user.countriesVisited}</p><p className="text-navy/60">Countries</p></div>
          <div><p className="font-display text-lg">{user.completedTrips.length}</p><p className="text-navy/60">Trips</p></div>
          <div><p className="font-display text-lg">{user.wishlist.length}</p><p className="text-navy/60">Wishlist</p></div>
        </div>
      </Card>
      <Card className="mt-3 p-4 text-sm">
        <p className="font-semibold">Settings</p>
        <button className="mt-2 text-coral underline">FAQ & Support</button>
      </Card>
      <TravelerTypeCard type={user.travelerType} detail={typeDetail} onRetake={() => setOpen(true)} />
      <QuizModal open={open} onClose={() => setOpen(false)} onComplete={(travelerType) => patchUser({ travelerType })} />
    </div>
  )
}
