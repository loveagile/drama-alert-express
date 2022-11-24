import { AppDataSource } from '../utils/data-source'
import { Achievement } from '../entity/Achievement'
import { AchievementType } from '../utils/types'

export const getAllAchievements = async (account: any) => {
  try {
    const achievements = await Achievement.find({
      where: { account_id: account.id },
    })
    return achievements
  } catch (error) {
    throw error
  }
}

export const createAchievement = async (achievement: AchievementType) => {
  try {
    const newAchievement = await AppDataSource.manager.save(
      AppDataSource.manager.create(Achievement, achievement)
    )
    return newAchievement
  } catch (error) {
    throw error
  }
}
