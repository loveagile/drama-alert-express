import { AppDataSource } from '../utils/data-source'
import { Comment } from '../entity/Comment'
import { CommentType } from '../utils/types'

export const getAllComments = async (account: any) => {
  try {
    const comments = await Comment.find({
      relations: ['user'],
      where: { account_id: account.id },
    })
    return comments
  } catch (error) {
    throw error
  }
}

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
