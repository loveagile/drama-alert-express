import { Request, Response } from 'express'

import { Comment } from '../entity/Comment'
import { User } from '../entity/User'
import { Account } from '../entity/Account'
import { createComment } from '../service/comments'
import { findUser } from '../service/user'
import { getAccountByUrl } from '../service/accounts'
import { getErrorMessage } from '../utils/errors'
import { CommentType } from '../utils/types'

export const addComment = async (req: Request, res: Response) => {
  try {
    const { content, user_id, account_id } = req.body
    const user = await User.findOne({ where: { id: user_id } })
    const account = await Account.findOne({ where: { id: account_id } })
    const comment: CommentType = {
      content: content,
      user_id: user,
      account_id: account,
    }
    const newComment = await createComment(comment)
    return res.status(200).json({ comment: newComment })
  } catch (error) {
    return res.status(500).json(getErrorMessage(error))
  }
}
