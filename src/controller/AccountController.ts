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
} from '../service/accounts'
import { getErrorMessage } from '../utils/errors'

export interface CustomRequest extends Request {
  token: string | JwtPayload
  user: UserType
}

export const getAccounts = async (req: Request, res: Response) => {
  try {
    const accounts = await getAllAccounts()
    return res.status(200).send(accounts)
  } catch (error) {
    return res.status(500).send(getErrorMessage(error))
  }
}

export const getAccount = async (req: Request, res: Response) => {
  try {
    const url = req.params.url
    const account = await getAccountByUrl(url)
    return res.status(200).send(account)
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
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(500).send(getErrorMessage(err))
      }
      account = { ...fields }
      account.urlname = fields.fullname.split(' ').join('').toLowerCase()
      const { photo, image } = files
      let oldPath = photo.filepath
      let newPath = path.join('./public/photos/') + photo.originalFilename
      file = newPath
      let rawData = fs.readFileSync(oldPath)
      account.photo = file

      fs.writeFile(newPath, rawData, async (err) => {
        if (err) {
          return res.status(500).json(getErrorMessage(err))
        }
        if (image) {
          oldPath = image.filepath
          newPath = path.join('./public/images/') + image.originalFilename
          file = newPath
          rawData = fs.readFileSync(oldPath)
          account.image = file
          fs.writeFile(newPath, rawData, async (err) => {
            if (err) {
              return res.status(500).json(getErrorMessage(err))
            }
            const newAccount = await createAccount(account)
            res.status(200).send({ account: newAccount })
          })
        } else {
          const newAccount = await createAccount(account)
          res.status(200).send({ account: newAccount })
        }
      })
    })
  } catch (error) {
    return res.status(500).send(getErrorMessage(error))
  }
}
