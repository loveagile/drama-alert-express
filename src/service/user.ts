import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

import { User } from '../entity/User'
import { CreateUserInput } from '../schema/user'
import { SECRET_KEY } from '../middleware/auth'
import { AppDataSource } from '../utils/data-source'

interface userType {
  username: string
  password: string
}

export const createUser = async (input: CreateUserInput) => {
  try {
    const user = await User.findOne({
      where: { username: input.username },
    })
    if (user) {
      throw new Error('User is exist!')
    }
    const createdUser = (await AppDataSource.manager.save(
      AppDataSource.manager.create(User, input)
    )) as User
    const token = jwt.sign(
      {
        id: createdUser.id,
        username: createdUser.username,
        role: createdUser.role,
      },
      SECRET_KEY,
      {
        expiresIn: 86400 * 365,
      }
    )
    return { user: createdUser, token }
  } catch (error) {
    throw error
  }
}

export const findUser = async (query: userType) => {
  try {
    const user = await User.findOne({ where: { username: query.username } })
    if (!user) {
      throw new Error('Username or password is incorrect')
    }
    const isMatch = bcrypt.compareSync(query.password, user.password)
    if (isMatch) {
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          role: user.role,
        },
        SECRET_KEY,
        {
          expiresIn: 86400 * 365,
        }
      )
      return { user, token }
    } else {
      throw new Error('Username or password is incorrect')
    }
  } catch (error) {
    throw error
  }
}
