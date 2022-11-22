import { Entity, Column, ManyToOne } from 'typeorm'

import Model from './Model'
import { Account } from './Account'
import { User } from './User'

@Entity('comments')
export class Comment extends Model {
  @Column()
  content: string

  @ManyToOne((type) => User, {
    cascade: true,
  })
  user_id: User

  @ManyToOne((type) => Account, {
    cascade: true,
  })
  account_id: Account
}
