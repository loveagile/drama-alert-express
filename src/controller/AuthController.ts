import { Request, Response } from 'express'

import { createUser, findUser } from '../service/user'
import { getErrorMessage } from '../utils/errors'

export const login = async (req: Request, res: Response) => {
  try {
    const user = await findUser(req.body)
    res.status(200).send(user)
  } catch (error) {
    res.status(500).send(getErrorMessage(error))
  }
}

export const register = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body)
    res.status(200).send(user)
  } catch (error) {
    res.status(500).send(getErrorMessage(error))
  }
}
