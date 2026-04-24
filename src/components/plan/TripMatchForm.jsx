import { useEffect, useMemo, useState } from 'react'
import { searchDestinations } from '../../api/destinations'
import { submitPlanningRequest } from '../../api/itinerary'
import { useDebounce } from '../../hooks/useDebounce'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { StepProgress } from './StepProgress'

const styles = ['Solo', 'Couple', 'Family', 'Friends']

const stepIsValid = (step, form) => {
  if (step === 1) return form.unsure || Boolean(form.destination.trim())
  if (step === 2) return Boolean(form.startDate && form.endDate && form.groupSize > 0)
  if (step === 3) return form.priorities.length > 0
  if (step === 4) return Boolean(form.name.trim() && form.email.trim())
  return true
}

export function TripMatchForm({ prefillDestination }) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [confirmation, setConfirmation] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const [form, setForm] = useState({
    destination: prefillDestination || '',
    unsure: false,
    startDate: '',
    endDate: '',
    groupSize: 2,
    travelStyle: 'Couple',
    budget: 2500,
    priorities: [],
    name: '',
    email: '',
    tier: 'Custom'
  })
  const debouncedDestination = useDebounce(form.destination, 300)

  useEffect(() => {
    if (!prefillDestination) return
    setForm((prev) => ({ ...prev, destination: prefillDestination, unsure: false }))
  }, [prefillDestination])

  useEffect(() => {
    let active = true
    if (!debouncedDestination.trim() || form.unsure) {
      setSuggestions([])
      return
    }

    searchDestinations(debouncedDestination).then((res) => {
      if (!active) return
      setSuggestions((res.data || []).slice(0, 5))
    })

    return () => {
      active = false
    }
  }, [debouncedDestination, form.unsure])

  const togglePriority = (p) => setForm((f) => ({ ...f, priorities: f.priorities.includes(p) ? f.priorities.filter((x) => x !== p) : [...f.priorities, p] }))
  const canContinue = useMemo(() => stepIsValid(step, form), [step, form])

  const next = () => {
    if (!canContinue) return
    setStep((s) => Math.min(4, s + 1))
  }

  const back = () => {
    setError('')
    setStep((s) => Math.max(1, s - 1))
  }

  const submit = async () => {
    if (!stepIsValid(4, form)) return
    setLoading(true)
    setError('')
    const res = await submitPlanningRequest(form)
    setLoading(false)
    if (res.error) {
      setError(res.error)
    } else {
      setConfirmation(res.data.confirmationId)
    }
  }

  if (confirmation) {
    return (
      <Card className="p-4">
        <h3 className="font-display text-xl">Request received</h3>
        <p className="mt-2 text-sm text-navy/70">Confirmation code: <strong>{confirmation}</strong>. We will be in touch within 24 hours.</p>
      </Card>
    )
  }

  return (
    <Card className="p-4">
      <StepProgress step={step} total={4} />
      {step === 1 ? (
        <div className="grid gap-2">
          <input className="rounded-xl border p-2" placeholder="Where to?" value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} disabled={form.unsure} />
          {suggestions.length ? (
            <div className="rounded-xl border bg-white p-2 text-xs">
              {suggestions.map((item) => (
                <button type="button" className="block py-1 text-left text-navy/70" key={item.id} onClick={() => setForm({ ...form, destination: `${item.name}, ${item.country}` })}>
                  {item.name}, {item.country}
                </button>
              ))}
            </div>
          ) : null}
          <label className="text-sm"><input type="checkbox" checked={form.unsure} onChange={(e) => setForm({ ...form, unsure: e.target.checked, destination: e.target.checked ? '' : form.destination })} /> I&apos;m not sure yet</label>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="grid gap-2">
          <input type="date" className="rounded-xl border p-2" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
          <input type="date" className="rounded-xl border p-2" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
          <input type="number" min="1" className="rounded-xl border p-2" value={form.groupSize} onChange={(e) => setForm({ ...form, groupSize: Number(e.target.value) || 1 })} />
          <div className="flex gap-2">{styles.map((s) => <button type="button" key={s} className={`rounded-full px-3 py-1 text-xs ${form.travelStyle === s ? 'bg-coral text-white' : 'bg-cream'}`} onClick={() => setForm({ ...form, travelStyle: s })}>{s}</button>)}</div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="grid gap-3">
          <label className="text-sm">Budget: ${form.budget}<input type="range" min="500" max="10000" step="100" value={form.budget} onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })} className="w-full" /></label>
          <div className="grid grid-cols-2 gap-2">{['Adventure', 'Relaxation', 'Food', 'Culture', 'Nightlife'].map((p) => <button type="button" key={p} onClick={() => togglePriority(p)} className={`rounded-xl border px-2 py-1 text-xs ${form.priorities.includes(p) ? 'border-coral bg-coral/10' : ''}`}>{p}</button>)}</div>
        </div>
      ) : null}

      {step === 4 ? (
        <div className="grid gap-2">
          <input className="rounded-xl border p-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="rounded-xl border p-2" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <select className="rounded-xl border p-2" value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value })}>
            <option>Starter</option>
            <option>Custom</option>
            <option>White Glove</option>
          </select>
        </div>
      ) : null}

      {error ? <p className="mt-2 rounded-lg bg-red-50 p-2 text-xs text-red-600">{error}</p> : null}
      {!canContinue ? <p className="mt-2 text-xs text-navy/60">Please complete this step to continue.</p> : null}

      <div className="mt-4 flex gap-2">
        {step > 1 ? <Button variant="ghost" onClick={back}>Back</Button> : null}
        {step < 4 ? <Button onClick={next} disabled={!canContinue}>Continue</Button> : <Button onClick={submit} disabled={loading || !canContinue} loading={loading}>{loading ? 'Submitting...' : 'Submit Request'}</Button>}
      </div>
    </Card>
  )
}
