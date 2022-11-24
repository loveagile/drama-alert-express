import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'

import Model from './Model'
import { Account } from './Account'

@Entity('achievements')
export class Achievement extends Model {
  @Column()
  content: string

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
