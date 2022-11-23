import * as express from 'express'

import {
  getAccounts,
  getAccount,
  addAccount,
} from '../controller/AccountController'
import { auth } from '../middleware/auth'

const router = express.Router()

router.get('/', auth, getAccounts)
router.get('/:url', auth, getAccount)
router.post('/', auth, addAccount)

export default router
