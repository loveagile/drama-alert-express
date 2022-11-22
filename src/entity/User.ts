import { Entity, Column, Index, BeforeInsert } from 'typeorm'
import * as bcrypt from 'bcryptjs'

import Model from './Model'

export enum RoleEnumType {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity('users')
export class User extends Model {
  @Column()
  firstname: string

  @Column()
  lastname: string

  @Column()
  password: string

  @Index('username_index')
  @Column()
  username: string

  @Column({
    type: 'enum',
    enum: RoleEnumType,
    default: RoleEnumType.USER,
  })
  role: RoleEnumType.USER

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12)
  }

  static async comparePasswords(
    candidatePassword: string,
    hashedPassword: string
  ) {
    return await bcrypt.compare(candidatePassword, hashedPassword)
  }
}
