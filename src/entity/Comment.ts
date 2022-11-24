import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'

import Model from './Model'
import { Account } from './Account'
import { User } from './User'

@Entity('comments')
export class Comment extends Model {
  @Column()
  content: string

  @Column()
  user_id: number

  @ManyToOne(
    () => User,
    (user) => {
      user.comments
    }
  )
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column()
  account_id: number

  @ManyToOne(
    () => Account,
    (account) => {
      account.achievements
    }
  )
  @JoinColumn({ name: 'account_id' })
  account: Account
}
