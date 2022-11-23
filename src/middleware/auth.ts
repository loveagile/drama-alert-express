import * as jwt from 'jsonwebtoken'
import { Secret, JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

import { User } from '../entity/User'

export const SECRET_KEY: Secret = '$ecret_Key'
export interface CustomRequest extends Request {
  token: string | JwtPayload
  user: string | JwtPayload
}

export const auth = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    if (!token) {
      throw new Error()
    }
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json({ message: err })
      req.user = user
      next()
    })
  } catch (error) {
    res.status(401).send('Please authenticate')
  }
}
