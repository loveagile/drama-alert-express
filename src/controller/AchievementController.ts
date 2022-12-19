import { Request, Response, NextFunction } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { UserType, AchievementType } from '../utils/types'
import {
  createAchievement,
  removeAchievement,
  updateAchievement,
} from '../service/achievements'

export interface CustomRequest extends Request {
  token: string | JwtPayload
  user: UserType
}

export const addAchievement = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).send({ message: "You don't have permission!" })
    }
    const { content, account_id } = req.body
    const achievement: AchievementType = {
      content: content,
      account_id: account_id,
    }
    const newAchievement = await createAchievement(achievement)
    return res.status(200).json({ achievement: newAchievement })
  } catch (error) {
    next(error)
  }
}

export const editAchievement = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "You don't have permission!" })
    }
    const { id } = req.params
    const { content } = req.body
    const updatedAchievement = await updateAchievement(Number(id), {
      content: content,
    })
    return res
      .status(200)
      .json({ success: true, achievement: updatedAchievement })
  } catch (error) {
    next(error)
  }
}

export const deleteAchievement = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "You don't have permission!" })
    }
    const { id } = req.params
    await removeAchievement(Number(id))
    res.status(204).send({ success: true })
  } catch (error) {
    next(error)
  }
}
