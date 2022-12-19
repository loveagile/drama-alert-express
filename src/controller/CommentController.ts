import { Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'

import { createComment } from '../service/comments'
import { getErrorMessage } from '../utils/errors'
import { UserType, CommentType } from '../utils/types'

export interface CustomRequest extends Request {
  token: string | JwtPayload
  user: UserType
}

export const addComment = async (req: CustomRequest, res: Response) => {
  try {
    const { content, account_id } = req.body
    const user = req.user
    const comment: CommentType = {
      content: content,
      user_id: user?.id,
      account_id: account_id,
    }
    const newComment = await createComment(comment)
    return res.status(200).json({ comment: newComment })
  } catch (error) {
    return res.status(500).json(getErrorMessage(error))
  }
}
