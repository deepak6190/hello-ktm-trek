import { Router, Request, Response } from 'express'
import { getCache } from '../cache'

const router = Router()

router.get('/', (_req: Request, res: Response) => {
  res.json({ success: true, data: getCache().reviews })
})

export default router
