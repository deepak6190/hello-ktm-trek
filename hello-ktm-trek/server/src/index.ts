import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDatabase } from './database'
import { loadCache } from './cache'
import tripsRouter from './routes/trips'
import destinationsRouter from './routes/destinations'
import blogsRouter from './routes/blogs'
import reviewsRouter from './routes/reviews'

const PORT = process.env.PORT ?? 3000

async function bootstrap(): Promise<void> {
  await connectDatabase()
  await loadCache()

  const app = express()
  app.use(cors())
  app.use(express.json())

  app.use('/api/trips', tripsRouter)
  app.use('/api/destinations', destinationsRouter)
  app.use('/api/blogs', blogsRouter)
  app.use('/api/reviews', reviewsRouter)

  app.get('/api/health', (_req, res) => {
    res.json({ success: true, data: { status: 'ok' } })
  })

  app.listen(PORT, () => {
    console.log(`[server] Running on http://localhost:${PORT}`)
  })
}

bootstrap().catch((err) => {
  console.error('[server] Fatal startup error:', err)
  process.exit(1)
})
