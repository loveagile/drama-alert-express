import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'drama_alert',
  synchronize: true,
  logging: false,
  entities: ['src/entity/**/*.ts'],
  migrations: [],
  subscribers: [],
})
