import { Entity, Column, Index } from 'typeorm'

import Model from './Model'

@Entity('users')
export class User extends Model {
  @Column()
  firstName: string

  @Column()
  lastName: string

  @Index('username_index')
  @Column()
  username: string
}
