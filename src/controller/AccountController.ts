import { Request, Response } from 'express'

import { getAllAccounts } from '../service/accounts'
import { getErrorMessage } from '../utils/errors'

export const getAccounts = async (req: Request, res: Response) => {
  try {
    const accounts = await getAllAccounts()
    res.status(200).send(accounts)
  } catch (error) {
    res.status(500).send(getErrorMessage(error))
  }
}
