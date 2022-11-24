export interface UserType {
  id: number
  username: string
  role: string
}

export interface AccountType {
  fullname: string
  photo: string
  title: string
  urlname: string
  video: string
  video_content: string
  image: string
  image_content: string
  facebook: string
  twitter: string
  youtube: string
  instagram: string
  show: boolean
}

export interface CommentType {
  content: string
  user_id: any
  account_id: any
}

export interface AchievementType {
  content: string
  account_id: any
}
