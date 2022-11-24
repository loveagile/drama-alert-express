import { AppDataSource } from '../utils/data-source'
import { Achievement } from '../entity/Achievement'
import { AchievementType } from '../utils/types'

export const getAllAchievements = async (account: any) => {
  try {
    const achievements = await AppDataSource.getRepository(Achievement)
      .createQueryBuilder('achievements')
      .leftJoin('achievements.account', 'account')
      .getMany()

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
