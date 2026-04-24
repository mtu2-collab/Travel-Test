export const usersSeed = [
  {
    id: 'user-1',
    name: 'Alex Rivera',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    travelerType: 'The Slow Wanderer',
    bio: 'Designer, amateur food critic, and serial sunrise chaser. I travel for texture, neighborhood rituals, and stories I can retell badly.',
    countriesVisited: 14,
    wishlist: ['dest-hoi-an', 'dest-lisbon'],
    completedTrips: [{ destinationId: 'dest-kyoto', notes: 'Stayed near Gion and loved the predawn temple walks.', dateVisited: '2024-06' }]
  }
]

export const travelerTypeDetails = {
  'The Slow Wanderer': {
    description: 'You prefer depth over checklist travel and love soaking in local rhythms.',
    traits: ['Patient explorer', 'Neighborhood first', 'Sunrise seeker']
  },
  'The Chaos Collector': {
    description: 'You thrive on motion, novelty, and spontaneous detours.',
    traits: ['High-energy planner', 'Night owl', 'Always curious']
  },
  'The Comfort Seeker': {
    description: 'You love travel that feels effortless, polished, and restorative.',
    traits: ['Amenity lover', 'Stress minimizer', 'Scenic upgrader']
  },
  'The Culture Seeker': {
    description: 'Museums, local history, and culinary context fuel your trips.',
    traits: ['Story collector', 'Food-first', 'Context-driven']
  },
  'The Adventure Junkie': {
    description: 'You build trips around movement, challenge, and wild landscapes.',
    traits: ['Action oriented', 'Trail hungry', 'Fearless tester']
  }
}
