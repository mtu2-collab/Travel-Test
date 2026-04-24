import { useState } from 'react'
import { travelerTypeDetails } from '../api/seed/users'
import { TravelerTypeCard } from '../components/profile/TravelerTypeCard'
import { QuizModal } from '../components/profile/QuizModal'
import { Card } from '../components/ui/Card'
import { useUser } from '../context/UserContext'

export function ProfilePage() {
  const { user, patchUser } = useUser()
  const [bio, setBio] = useState(user?.bio || '')
  const [open, setOpen] = useState(false)

  if (!user) return null

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
      </Card>
      <Card className="mt-3 p-4 text-sm">
        <p>Settings</p>
        <button className="mt-2 text-coral underline">FAQ & Support</button>
      </Card>
      <TravelerTypeCard type={user.travelerType} detail={travelerTypeDetails[user.travelerType]} onRetake={() => setOpen(true)} />
      <QuizModal open={open} onClose={() => setOpen(false)} onComplete={(travelerType) => patchUser({ travelerType })} />
    </div>
  )
}
