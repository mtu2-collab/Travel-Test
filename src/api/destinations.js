// FAKE API — replace with real fetch() calls when backend is ready
// GET /api/destinations, GET /api/destinations/:id, GET /api/featured-drops, GET /api/destinations/search?q=
import { store, simulateDelay, ok, fail } from './store.js'

const PAGE_SIZE = 6

export async function getDestinations({ filter = 'all', page = 1 } = {}) {
  await simulateDelay()
  try {
    const lower = filter.toLowerCase()
    const filtered = lower === 'all'
      ? store.destinations
      : store.destinations.filter((d) => d.vibe.some((v) => v.toLowerCase().includes(lower)))

    const start = (page - 1) * PAGE_SIZE
    return ok({
      items: filtered.slice(start, start + PAGE_SIZE),
      hasMore: start + PAGE_SIZE < filtered.length,
      page
    })
  } catch {
    return fail('Something went wrong')
  }
}

export async function getDestinationById(id) {
  await simulateDelay()
  const destination = store.destinations.find((d) => d.id === id)
  return destination ? ok(destination) : fail('Destination not found')
}

export async function getFeaturedDrops() {
  await simulateDelay()
  return ok(store.featuredDrops)
}

export async function searchDestinations(query = '') {
  await simulateDelay()
  const q = query.trim().toLowerCase()
  if (!q) return ok([])
  const results = store.destinations.filter((d) => `${d.name} ${d.country} ${d.region} ${d.vibe.join(' ')}`.toLowerCase().includes(q))
  return ok(results)
}
