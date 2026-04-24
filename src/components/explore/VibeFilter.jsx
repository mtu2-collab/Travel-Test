const vibes = ['All', 'Slow & Coastal', 'Chaotic & Electric', 'Hidden & Rugged', 'Cultural', 'Luxury', 'Adventure']

export function VibeFilter({ value, onChange }) {
  return (
    <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
      {vibes.map((vibe) => (
        <button key={vibe} onClick={() => onChange(vibe)} className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${value === vibe ? 'bg-coral text-white' : 'bg-white text-navy'}`}>
          {vibe}
        </button>
      ))}
    </div>
  )
}
