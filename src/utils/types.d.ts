export interface UserType {
  id: number
  username: string
  role: string
}

export interface AccountType {
  fullname: string
  photo: string
  country: string
  title: string
  urlname: string
  video?: string
  video_title?: string
  video_preview?: string
  video_content?: string
  image?: string
  image_title?: string
  image_content?: string
  facebook?: string
  twitter?: string
  youtube?: string
  instagram?: string
  tiKtok?: string
  show?: boolean
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
