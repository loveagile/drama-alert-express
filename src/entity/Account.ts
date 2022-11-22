import { Entity, Column, Index } from 'typeorm'

import Model from './Model'

@Entity('accounts')
@Index(['urlname'], { unique: true })
export class Account extends Model {
  @Column()
  fullname: string

  @Column({ nullable: false })
  urlname: string

  @Column()
  photo: string

  @Column()
  title: string

  @Column()
  facebook: string

  @Column()
  twitter: string

  @Column()
  youtube: string

  @Column()
  instagram: string

  @Column({ default: () => true })
  show: boolean
}
