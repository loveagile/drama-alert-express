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

export const getAchievement = async (id: number) => {
  try {
    const achievement = await Achievement.findOne({
      where: { id: id },
    })
    return achievement
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

export const updateAchievement = async (id: number, obj: object) => {
  try {
    const achievement = await getAchievement(id)
    AppDataSource.getRepository(Achievement).merge(achievement, obj)
    const updatedAchievement = await AppDataSource.getRepository(
      Achievement
    ).save(achievement)
    return updatedAchievement
  } catch (error) {
    throw error
  }
}

export const removeAchievement = async (id: number) => {
  try {
    await AppDataSource.createQueryBuilder()
      .delete()
      .from(Achievement)
      .where({ id: id })
      .execute()
  } catch (error) {
    throw error
  }
}
