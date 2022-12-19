import 'reflect-metadata'
import { DataSource } from 'typeorm'

import { User } from '../entity/User'
import { Account } from '../entity/Account'
import { Achievement } from '../entity/Achievement'
import { Comment } from '../entity/Comment'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'drama_alert',
  synchronize: true,
  logging: false,
  entities: [User, Achievement, Account, Comment],
  migrations: [],
  subscribers: [],
})
