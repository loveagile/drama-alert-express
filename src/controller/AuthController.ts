import { NextFunction, Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'

import { createUser, findUser } from '../service/user'
import { UserType } from '../utils/types'

export interface CustomRequest extends Request {
  token: string | JwtPayload
  user: UserType
}

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findUser(req.body)
    return res.status(200).send(user)
  } catch (error) {
    next(error)
  }
}

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createUser(req.body)
    return res.status(200).send(user)
  } catch (error) {
    next(error)
  }
}

export const getCurrentUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ user: req.user })
  } catch (error) {
    next(error)
  }
}
