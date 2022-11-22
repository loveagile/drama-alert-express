import { Entity, Column, ManyToOne } from 'typeorm'

import Model from './Model'
import { Account } from './Account'

@Entity('posts')
export class Post extends Model {
  @Column()
  video: string

  @Column()
  iamge: string

  @Column()
  content: string

  @ManyToOne((type) => Account, {
    cascade: true,
  })
  account_id: Account
}
