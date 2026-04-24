// FAKE API — replace with real fetch() calls when backend is ready
// GET /api/users/me, PATCH /api/users/me, GET /api/users/:id/traveler-type
import { store, persistStore, simulateDelay, ok, fail } from './store'

const CURRENT_USER_ID = 'user-1'

export async function getCurrentUser() {
  await simulateDelay()
  const user = store.users.find((u) => u.id === CURRENT_USER_ID)
  return user ? ok(user) : fail('User not found')
}

export async function updateUser(data) {
  await simulateDelay()
  const userIndex = store.users.findIndex((u) => u.id === CURRENT_USER_ID)
  if (userIndex < 0) return fail('User not found')
  store.users[userIndex] = { ...store.users[userIndex], ...data }
  persistStore()
  return ok(store.users[userIndex])
}

export async function getTravelerType(userId) {
  await simulateDelay()
  const user = store.users.find((u) => u.id === userId)
  return user ? ok(user.travelerType) : fail('Traveler type not found')
}
