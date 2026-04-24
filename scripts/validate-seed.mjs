import { destinationsSeed } from '../src/api/seed/destinations.js'

const requiredString = ['id', 'name', 'country', 'region', 'heroImage', 'description', 'localTip', 'budget']
const requiredArray = ['gallery', 'vibe', 'bestFor', 'teaserItinerary', 'travelerTypes']

const errors = []

if (destinationsSeed.length < 16) {
  errors.push(`Expected at least 16 destinations, got ${destinationsSeed.length}`)
}

for (const destination of destinationsSeed) {
  for (const field of requiredString) {
    if (!destination[field] || typeof destination[field] !== 'string') {
      errors.push(`${destination.id}: missing/invalid string field '${field}'`)
    }
  }

  for (const field of requiredArray) {
    if (!Array.isArray(destination[field]) || destination[field].length === 0) {
      errors.push(`${destination.id}: missing/invalid array field '${field}'`)
    }
  }

  if (!Array.isArray(destination.gallery) || destination.gallery.length !== 3) {
    errors.push(`${destination.id}: gallery must contain exactly 3 images`)
  }

  if (!Array.isArray(destination.teaserItinerary) || destination.teaserItinerary.length !== 3) {
    errors.push(`${destination.id}: teaserItinerary must contain Day 1, Day 2, Day 3`)
  }

  const hasPlaceholders = ['description', 'localTip'].some((field) => String(destination[field]).includes('...'))
  if (hasPlaceholders) {
    errors.push(`${destination.id}: placeholder text detected`)
  }

  if (typeof destination.rating !== 'number' || typeof destination.reviewCount !== 'number') {
    errors.push(`${destination.id}: rating/reviewCount must be numeric`)
  }
}

if (errors.length) {
  console.error('Destination seed validation failed:\n' + errors.map((error) => `- ${error}`).join('\n'))
  process.exit(1)
}

console.log(`✅ Destination seed validation passed for ${destinationsSeed.length} destinations.`)
