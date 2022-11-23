import * as express from 'express'

import {
  getAccounts,
  getAccount,
  addAccount,
  editAccount,
} from '../controller/AccountController'
import { auth } from '../middleware/auth'

const router = express.Router()

router.get('/', auth, getAccounts)
router.get('/:url', auth, getAccount)
router.post('/', auth, addAccount)
router.put('/:url', auth, editAccount)

export default router
