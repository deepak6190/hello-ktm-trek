import 'dotenv/config'
import { connectDatabase } from '../database'
import { Trip } from '../models/Trip'
import { Destination } from '../models/Destination'
import { Blog } from '../models/Blog'
import { Review } from '../models/Review'
import { TRIPS } from './data/trips'
import { DESTINATIONS } from './data/destinations'
import { BLOGS } from './data/blogs'
import { REVIEWS } from './data/reviews'

async function seed(): Promise<void> {
  await connectDatabase()

  await Promise.all([
    Trip.deleteMany({}),
    Destination.deleteMany({}),
    Blog.deleteMany({}),
    Review.deleteMany({}),
  ])
  console.log('[seed] Cleared existing documents')

  await Promise.all([
    Trip.insertMany(TRIPS),
    Destination.insertMany(DESTINATIONS),
    Blog.insertMany(BLOGS),
    Review.insertMany(REVIEWS),
  ])

  console.log('[seed] Inserted:')
  console.log(`  - ${TRIPS.length} trips`)
  console.log(`  - ${DESTINATIONS.length} destinations`)
  console.log(`  - ${BLOGS.length} blog posts`)
  console.log(`  - ${REVIEWS.length} reviews`)
  console.log('[seed] Done.')
  process.exit(0)
}

seed().catch((err) => {
  console.error('[seed] Error:', err)
  process.exit(1)
})
