import { Search } from 'lucide-react'

export function SearchBar({ value, onChange }) {
  return (
    <label className="mb-3 flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-soft">
      <Search size={16} className="text-navy/50" />
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="Search destinations or vibe" className="w-full bg-transparent text-sm outline-none" />
    </label>
  )
}
