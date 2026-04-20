import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import routes from './routes'
import { notFound, errorHandler } from './middlewares/error.middleware'

const app = express()

app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'hello-ktm-trek-api' }))

app.use('/api', routes)

app.use(notFound)
app.use(errorHandler)

export default app
