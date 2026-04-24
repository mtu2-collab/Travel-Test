export function StepProgress({ step, total }) {
  const pct = Math.round((step / total) * 100)
  return (
    <div className="mb-3">
      <div className="h-2 rounded-full bg-white/60">
        <div className="h-full rounded-full bg-coral" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-1 text-xs text-navy/60">Step {step} of {total}</p>
    </div>
  )
}
