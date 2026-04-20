import { Request, Response, NextFunction } from 'express'

export const notFound = (req: Request, res: Response) => {
  res.status(404).json({ success: false, error: { message: `Route ${req.originalUrl} not found` } })
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ success: false, error: { message: 'Internal server error' } })
}
