import { AppDataSource } from '../utils/data-source'
import { Comment } from '../entity/Comment'
import { CommentType } from '../utils/types'

export const createComment = async (comment: CommentType) => {
  try {
    const newComment = await AppDataSource.manager.save(
      AppDataSource.manager.create(Comment, comment)
    )
    return newComment
  } catch (error) {
    throw error
  }
}
