import { Request, Response } from 'express'

import { Account } from '../entity/Account'
import { AchievementType } from '../utils/types'
import { createAchievement } from '../service/achievements'
import { getErrorMessage } from '../utils/errors'

export const addAchievement = async (req: Request, res: Response) => {
  try {
    const { content, account_id } = req.body
    const account = await Account.findOne({ where: { id: account_id } })
    const achievement: AchievementType = {
      content: content,
      account_id: account,
    }
    const newAchievement = await createAchievement(achievement)
    return res.status(200).json({ achievement: newAchievement })
  } catch (error) {
    return res.status(500).json(getErrorMessage(error))
  }
}
