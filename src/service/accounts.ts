import { Account } from '../entity/Account'
import { AppDataSource } from '../utils/data-source'
import { AccountType } from '../utils/types'

export const getAllAccounts = async () => {
  try {
    const accounts = await Account.find()
    return accounts
  } catch (error) {
    throw error
  }
}

export const getAccountByUrl = async (url: string) => {
  try {
    const account = await Account.findOne({ where: { urlname: url } })
    return account
  } catch (error) {
    throw error
  }
}

export const createAccount = async (account: AccountType) => {
  try {
    const newAccount = (await AppDataSource.manager.save(
      AppDataSource.manager.create(Account, account)
    )) as Account
    return newAccount
  } catch (error) {
    throw error
  }
}

export const updateAccount = async (url: string, obj: object) => {
  try {
    const account = await getAccountByUrl(url)
    AppDataSource.getRepository(Account).merge(account, obj)
    const updatedAccount = await AppDataSource.getRepository(Account).save(
      account
    )
    return updatedAccount
  } catch (error) {
    throw error
  }
}

export const removeAccount = async (url: string) => {
  try {
    await AppDataSource.createQueryBuilder()
      .delete()
      .from(Account)
      .where({ urlname: url })
      .execute()
  } catch (error) {
    throw error
  }
}
