import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import app from './app'

const PORT = process.env.PORT ?? 5001
const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/hello-ktm-trek'

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB: hello-ktm-trek')
    app.listen(PORT, () => console.log(`hello-ktm-trek-api running on port ${PORT}`))
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  })

process.on('SIGINT', async () => {
  await mongoose.disconnect()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  await mongoose.disconnect()
  process.exit(0)
})
