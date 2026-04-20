import { Router, Request, Response } from 'express'
import { getCache } from '../cache'

const router = Router()

router.get('/', (_req: Request, res: Response) => {
  res.json({ success: true, data: getCache().destinations })
})

router.get('/:id', (req: Request, res: Response) => {
  const destination = getCache().destinations.find((d: any) => d.id === req.params.id)
  if (!destination) {
    res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Destination not found' } })
    return
  }
  res.json({ success: true, data: destination })
})

export default router
