import { Account } from '../entity/Account'
import { AppDataSource } from '../utils/data-source'
import { AccountType } from '../utils/types'

export const getAllAccounts = async () => {
  try {
    const accounts = await Account.find()
    return { accounts }
  } catch (error) {
    throw error
  }
}

export const createAccount = async (account: AccountType) => {
  try {
    const newAccount = (await AppDataSource.manager.save(
      AppDataSource.manager.create(Account, account)
    )) as Account
    return { account: newAccount }
  } catch (error) {
    throw error
  }
}
