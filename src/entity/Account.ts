import { Entity, Column, Index, OneToMany, JoinTable } from 'typeorm'
import { Achievement } from './Achievement'
import { Comment } from './Comment'

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
  video: string

  @Column()
  video_content: string

  @Column()
  image: string

  @Column()
  image_content: string

  @Column({ nullable: true })
  facebook: string

  @Column({ nullable: true })
  twitter: string

  @Column({ nullable: true })
  youtube: string

  @Column({ nullable: true })
  instagram: string

  @Column('boolean', { default: true })
  show: boolean

  @OneToMany(() => Achievement, (achievement) => achievement.account)
  @JoinTable()
  achievements: Achievement[]

  @OneToMany(() => Comment, (comment) => comment.account)
  @JoinTable()
  comments: Comment[]
}
