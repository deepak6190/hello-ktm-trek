import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Trip, DestinationItem, BlogPost, Review } from '@/types'
import { API_BASE_URL } from '@/constants/api'

interface AppData {
  trips: Trip[]
  destinations: DestinationItem[]
  blogs: BlogPost[]
  reviews: Review[]
  isLoading: boolean
  error: string | null
}

const DataContext = createContext<AppData>({
  trips: [],
  destinations: [],
  blogs: [],
  reviews: [],
  isLoading: true,
  error: null,
})

async function fetchResource<T>(path: string): Promise<T[]> {
  const response = await fetch(`${API_BASE_URL}${path}`)
  if (!response.ok) throw new Error(`Failed to fetch ${path}: ${response.status}`)
  const json = await response.json()
  return json.data as T[]
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>([])
  const [destinations, setDestinations] = useState<DestinationItem[]>([])
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const [tripsData, destinationsData, blogsData, reviewsData] = await Promise.all([
          fetchResource<Trip>('/api/trips'),
          fetchResource<DestinationItem>('/api/destinations'),
          fetchResource<BlogPost>('/api/blog'),
          fetchResource<Review>('/api/reviews'),
        ])
        setTrips(tripsData)
        setDestinations(destinationsData)
        setBlogs(blogsData)
        setReviews(reviewsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data')
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [])

  return (
    <DataContext.Provider value={{ trips, destinations, blogs, reviews, isLoading, error }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData(): AppData {
  return useContext(DataContext)
}
