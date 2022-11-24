import * as express from 'express'

import {
  getAccounts,
  getAccount,
  addAccount,
  editAccount,
  deleteAccount,
} from '../controller/AccountController'
import { auth } from '../middleware/auth'

const router = express.Router()

router.get('/', auth, getAccounts)
router.get('/:url', auth, getAccount)
router.post('/', auth, addAccount)
router.put('/:url', auth, editAccount)
router.delete('/:url', auth, deleteAccount)

export default router
