import { Compass, Map, Star, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const items = [
  { to: '/explore', label: 'Explore', icon: Compass },
  { to: '/trips', label: 'My Trips', icon: Map },
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/plan', label: 'Plan With Us', icon: Star }
]

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 flex justify-center bg-white/95 backdrop-blur">
      <div className="flex w-full max-w-[430px] justify-around border-t border-navy/10 px-2 py-2">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `flex flex-col items-center gap-1 rounded-xl px-2 py-1 text-xs ${isActive ? 'text-coral' : 'text-navy/60'}`}>
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
