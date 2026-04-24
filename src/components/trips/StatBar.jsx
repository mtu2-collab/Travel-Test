import { Card } from '../ui/Card'

export function StatBar({ stats }) {
  return (
    <Card className="mb-3 grid grid-cols-3 p-3 text-center">
      {stats.map((s) => (
        <div key={s.label}>
          <p className="font-display text-lg text-navy">{s.value}</p>
          <p className="text-[11px] text-navy/60">{s.label}</p>
        </div>
      ))}
    </Card>
  )
}
