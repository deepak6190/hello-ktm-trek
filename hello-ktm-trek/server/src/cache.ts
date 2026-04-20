import fs from 'fs'
import path from 'path'
import { Trip } from './models/Trip'
import { Destination } from './models/Destination'
import { Blog } from './models/Blog'
import { Review } from './models/Review'

const CACHE_DIR = path.join(__dirname, '..', 'cache')

interface AppCache {
  trips: unknown[]
  destinations: unknown[]
  blogs: unknown[]
  reviews: unknown[]
}

const cache: AppCache = {
  trips: [],
  destinations: [],
  blogs: [],
  reviews: [],
}

function ensureCacheDir(): void {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true })
  }
}

function writeFile(name: string, data: unknown[]): void {
  const filePath = path.join(CACHE_DIR, `${name}.json`)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
  console.log(`[cache] Written ${data.length} ${name} → ${filePath}`)
}

export async function loadCache(): Promise<void> {
  console.log('[cache] Loading data from MongoDB…')

  const [trips, destinations, blogs, reviews] = await Promise.all([
    Trip.find().lean(),
    Destination.find().lean(),
    Blog.find().lean(),
    Review.find().lean(),
  ])

  cache.trips = trips
  cache.destinations = destinations
  cache.blogs = blogs
  cache.reviews = reviews

  ensureCacheDir()
  writeFile('trips', trips)
  writeFile('destinations', destinations)
  writeFile('blogs', blogs)
  writeFile('reviews', reviews)

  console.log('[cache] Ready — trips: %d, destinations: %d, blogs: %d, reviews: %d',
    trips.length, destinations.length, blogs.length, reviews.length)
}

export function getCache(): AppCache {
  return cache
}
