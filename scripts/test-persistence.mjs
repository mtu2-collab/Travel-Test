import path from 'node:path'
import { pathToFileURL } from 'node:url'

const storeMemory = new Map()

globalThis.window = {}
globalThis.localStorage = {
  getItem: (key) => (storeMemory.has(key) ? storeMemory.get(key) : null),
  setItem: (key, value) => storeMemory.set(key, String(value)),
  removeItem: (key) => storeMemory.delete(key),
  clear: () => storeMemory.clear()
}

const importFresh = async (relativePath) => {
  const fullPath = path.resolve(process.cwd(), relativePath)
  const url = `${pathToFileURL(fullPath).href}?v=${Date.now()}-${Math.random()}`
  return import(url)
}

async function run() {
  localStorage.clear()

  // first load and mutate state through API modules
  const usersApi = await importFresh('src/api/users.js')
  const tripsApi = await importFresh('src/api/trips.js')

  await usersApi.updateUser({ bio: 'Persistence check bio', travelerType: 'The Culture Seeker' })
  await tripsApi.saveTrip('dest-banff')
  await tripsApi.markTripComplete('dest-banff', 'Great test trip', '2025-08')

  // simulate full refresh by re-importing modules (and therefore reloading store from localStorage)
  const usersApiReloaded = await importFresh('src/api/users.js')
  const tripsApiReloaded = await importFresh('src/api/trips.js')

  const userRes = await usersApiReloaded.getCurrentUser()
  if (userRes.error) throw new Error(`getCurrentUser failed: ${userRes.error}`)

  const completedRes = await tripsApiReloaded.getCompletedTrips('user-1')
  if (completedRes.error) throw new Error(`getCompletedTrips failed: ${completedRes.error}`)

  const user = userRes.data
  const completed = completedRes.data

  if (user.bio !== 'Persistence check bio') throw new Error('Bio did not persist across refresh')
  if (user.travelerType !== 'The Culture Seeker') throw new Error('Traveler type did not persist across refresh')
  if (user.wishlist.includes('dest-banff')) throw new Error('Wishlist state did not persist correctly after completion flow')
  if (!completed.some((trip) => trip.destinationId === 'dest-banff' && trip.notes === 'Great test trip')) {
    throw new Error('Completed trip did not persist across refresh')
  }

  console.log('✅ Persistence check passed for bio, travelerType, wishlist, and completed trips across refresh simulation.')
}

run().catch((error) => {
  console.error(`❌ Persistence check failed: ${error.message}`)
  process.exit(1)
})
