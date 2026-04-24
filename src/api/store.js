import { destinationsSeed, featuredDropsSeed } from './seed/destinations'
import { usersSeed } from './seed/users'

const STORAGE_KEY = 'travel-test-store-v1'

const fallbackStore = {
  destinations: destinationsSeed,
  featuredDrops: featuredDropsSeed,
  users: usersSeed,
  planningRequests: []
}

function loadStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : fallbackStore
  } catch {
    return fallbackStore
  }
}

export const store = typeof window === 'undefined' ? { ...fallbackStore } : loadStore()

export const persistStore = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  }
}

export const simulateDelay = () => new Promise((resolve) => setTimeout(resolve, 400 + Math.floor(Math.random() * 500)))

export const ok = (data) => ({ data, error: null })
export const fail = (error) => ({ data: null, error })
