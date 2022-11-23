import { Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'

import { User } from '../utils/types'
import { getAllAccounts, createAccount } from '../service/accounts'
import { getErrorMessage } from '../utils/errors'

export interface CustomRequest extends Request {
  token: string | JwtPayload
  user: User
}

export const getAccounts = async (req: Request, res: Response) => {
  try {
    const accounts = await getAllAccounts()
    return res.status(200).send(accounts)
  } catch (error) {
    return res.status(500).send(getErrorMessage(error))
  }
}

export const addAccount = async (req: CustomRequest, res: Response) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).send({ message: 'No authentication' })
    }
    const urlname = req.body.fullname.split(' ').join('').toLowerCase()
    const account = { ...req.body, urlname }
    const newAccount = await createAccount(account)
    return res.status(200).send({ account: newAccount })
  } catch (error) {
    return res.status(500).send(getErrorMessage(error))
  }
}
