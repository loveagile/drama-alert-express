import { Entity, Column, ManyToOne, JoinTable } from 'typeorm'

import Model from './Model'
import { Account } from './Account'

@Entity('achievements')
export class Achievement extends Model {
  @Column()
  content: string

  @ManyToOne((type) => Account, {
    cascade: true,
  })
  @JoinTable()
  account_id: Account
}
