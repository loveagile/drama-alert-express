import { Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import * as formidable from 'formidable'
import * as fs from 'fs'
import * as path from 'path'

import { UserType } from '../utils/types'
import {
  getAllAccounts,
  getAccountByUrl,
  createAccount,
  updateAccount,
  removeAccount,
} from '../service/accounts'
import { getErrorMessage } from '../utils/errors'
import { getAllComments } from '../service/comments'

export interface CustomRequest extends Request {
  token: string | JwtPayload
  user: UserType
}

export const getAccounts = async (req: Request, res: Response) => {
  try {
    const accounts = await getAllAccounts()
    return res.status(200).send({ accounts })
  } catch (error) {
    return res.status(500).send(getErrorMessage(error))
  }
}

export const getAccount = async (req: Request, res: Response) => {
  try {
    const url = req.params.url
    const account = await getAccountByUrl(url)
    const comments = await getAllComments(account)
    return res.status(200).send({ account, comments })
  } catch (error) {
    return res.status(500).send(getErrorMessage(error))
  }
}

export const addAccount = async (req: CustomRequest, res: Response) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).send({ message: 'No authentication' })
    }
    const form = new formidable.IncomingForm()
    let account, file
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).send(getErrorMessage(err))
      }
      account = { ...fields }
      account.urlname = fields.fullname.split(' ').join('').toLowerCase()
      const { photo, image } = files
      if (photo) {
        const oldPath = photo.filepath
        const newPath = path.join('./public/photos/') + photo.originalFilename
        file = newPath
        const rawData = fs.readFileSync(oldPath)
        account.photo = file

        await fs.writeFile(newPath, rawData, async (err) => {
          if (err) {
            return res.status(500).json(getErrorMessage(err))
          }
        })
      }

      if (image) {
        const oldPath = image.filepath
        const newPath = path.join('./public/images/') + image.originalFilename
        file = newPath
        const rawData = fs.readFileSync(oldPath)
        account.image = file

        await fs.writeFile(newPath, rawData, async (err) => {
          if (err) {
            return res.status(500).json(getErrorMessage(err))
          }
        })
      }
      const newAccount = await createAccount(account)
      res.status(200).send({ account: newAccount })
    })
  } catch (error) {
    return res.status(500).send(getErrorMessage(error))
  }
}

export const editAccount = async (req: CustomRequest, res: Response) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).send({ message: 'No authentication' })
    }
    const form = new formidable.IncomingForm()
    const url = req.params.url

    let account, file
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).send(getErrorMessage(err))
      }
      account = { ...fields }
      if (account.fullname) {
        account.urlname = fields.fullname.split(' ').join('').toLowerCase()
      }
      const { photo, image } = files
      if (photo) {
        const oldPath = photo.filepath
        const newPath = path.join('./public/photos/') + photo.originalFilename
        file = newPath
        const rawData = fs.readFileSync(oldPath)
        account.photo = file

        await fs.writeFile(newPath, rawData, async (err) => {
          if (err) {
            return res.status(500).json(getErrorMessage(err))
          }
        })
      }
      if (image) {
        const oldPath = image.filepath
        const newPath = path.join('./public/images/') + image.originalFilename
        file = newPath
        const rawData = fs.readFileSync(oldPath)
        account.image = file

        await fs.writeFile(newPath, rawData, async (err) => {
          if (err) {
            return res.status(500).json(getErrorMessage(err))
          }
        })
      }
      const savedAccount = await updateAccount(url, account)
      res.status(200).send({ account: savedAccount })
    })
  } catch (error) {
    return res.status(500).send(getErrorMessage(error))
  }
}

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const url = req.params.url
    await removeAccount(url)
    res.status(204).send({ success: true })
  } catch (error) {
    return res.status(500).send(getErrorMessage(error))
  }
}
