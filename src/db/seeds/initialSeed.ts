import { Factory, Seeder } from 'typeorm-seeding'
import { DataSource, Connection } from 'typeorm'
import { User } from '../../entity/User'
import * as bcrypt from 'bcryptjs'

export default class CreateUser implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const password = await bcrypt.hash('123456', 10)
    const admin = {
      firstname: 'Rose',
      lastname: 'Will',
      username: 'admin',
      password,
    }
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(admin)
      .execute()
  }
}
