import { Account } from '../entity/Account'
import { AppDataSource } from '../utils/data-source'

interface accountType {
  fullname: string
  photo: string
  title: string
  urlname: string
  video: string
  video_content: string
  image: string
  image_content: string
  facebook: string
  twitter: string
  youtube: string
  instagram: string
  show: boolean
}

export const getAllAccounts = async () => {
  try {
    const accounts = await Account.find()
    return { accounts }
  } catch (error) {
    throw error
  }
}

export const createAccount = async (account: accountType) => {
  try {
    const newAccount = (await AppDataSource.manager.save(
      AppDataSource.manager.create(Account, account)
    )) as Account
    return { account: newAccount }
  } catch (error) {
    throw error
  }
}
