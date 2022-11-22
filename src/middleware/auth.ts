import * as jwt from 'jsonwebtoken'
import { Secret, JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export const SECRET_KEY: Secret = '$ecret_Key'
export interface CustomRequest extends Request {
  token: string | JwtPayload
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authentication')?.replace('Bearer ', '')
    if (!token) {
      throw new Error()
    }
    const decoded = jwt.verify(token, SECRET_KEY)
    ;(req as CustomRequest).token = decoded
    next()
  } catch (error) {
    res.status(401).send('Please authenticate')
  }
}
