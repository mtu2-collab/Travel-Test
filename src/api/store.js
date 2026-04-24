import { destinationsSeed, featuredDropsSeed } from './seed/destinations.js'
import { usersSeed } from './seed/users.js'

const STORAGE_KEY = 'travel-test-store-v1'

const baseStore = {
  destinations: destinationsSeed,
  featuredDrops: featuredDropsSeed,
  users: usersSeed,
  planningRequests: []
}

const cloneBaseStore = () => JSON.parse(JSON.stringify(baseStore))

function loadStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : cloneBaseStore()
  } catch {
    return cloneBaseStore()
  }
}

export const store = typeof window === 'undefined' ? cloneBaseStore() : loadStore()

export const persistStore = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  }
}

export const simulateDelay = () => new Promise((resolve) => setTimeout(resolve, 400 + Math.floor(Math.random() * 500)))

export const ok = (data) => ({ data, error: null })
export const fail = (error) => ({ data: null, error })
