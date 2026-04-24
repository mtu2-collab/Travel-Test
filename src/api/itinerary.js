// FAKE API — replace with real fetch() calls when backend is ready
// POST /api/planning-requests, GET /api/itinerary/preview/:destinationId
import { store, persistStore, simulateDelay, ok, fail } from './store'

export async function submitPlanningRequest(formData) {
  await simulateDelay()
  try {
    const confirmationId = `TRIP-${Date.now().toString().slice(-6)}`
    store.planningRequests.push({ ...formData, confirmationId, submittedAt: new Date().toISOString() })
    persistStore()
    console.log('Planning Request:', formData)
    return ok({ confirmationId })
  } catch {
    return fail('Something went wrong')
  }
}

export async function getItineraryPreview(destinationId) {
  await simulateDelay()
  const destination = store.destinations.find((d) => d.id === destinationId)
  return destination ? ok(destination.teaserItinerary) : fail('Preview unavailable')
}
