// FAKE API — replace with real fetch() calls when backend is ready
// GET /api/users/:id/trips/saved, GET /api/users/:id/trips/completed, POST /api/trips/saved, PATCH /api/trips/:id/complete, DELETE /api/trips/:id
import { store, persistStore, simulateDelay, ok, fail } from './store'

const userById = (id = 'user-1') => store.users.find((u) => u.id === id)

export async function getSavedTrips(userId) {
  await simulateDelay()
  const user = userById(userId)
  if (!user) return fail('User not found')
  const trips = user.wishlist.map((destinationId) => store.destinations.find((d) => d.id === destinationId)).filter(Boolean)
  return ok(trips)
}

export async function getCompletedTrips(userId) {
  await simulateDelay()
  const user = userById(userId)
  if (!user) return fail('User not found')
  const trips = user.completedTrips.map((trip) => ({ ...trip, destination: store.destinations.find((d) => d.id === trip.destinationId) }))
  return ok(trips)
}

export async function saveTrip(destinationId) {
  await simulateDelay()
  const user = userById()
  if (!user) return fail('User not found')
  if (!user.wishlist.includes(destinationId)) user.wishlist.push(destinationId)
  persistStore()
  return ok(user.wishlist)
}

export async function markTripComplete(destinationId, notes = '', dateVisited) {
  await simulateDelay()
  const user = userById()
  if (!user) return fail('User not found')
  user.wishlist = user.wishlist.filter((id) => id !== destinationId)
  user.completedTrips.unshift({ destinationId, notes, dateVisited: dateVisited || new Date().toISOString().slice(0, 7) })
  user.countriesVisited = new Set(user.completedTrips.map((trip) => (store.destinations.find((d) => d.id === trip.destinationId)?.country || ''))).size
  persistStore()
  return ok(user.completedTrips)
}

export async function deleteTrip(destinationId) {
  await simulateDelay()
  const user = userById()
  if (!user) return fail('User not found')
  user.wishlist = user.wishlist.filter((id) => id !== destinationId)
  persistStore()
  return ok(user.wishlist)
}
