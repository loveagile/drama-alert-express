import * as express from 'express'

import { getAccounts, addAccount } from '../controller/AccountController'
import { auth } from '../middleware/auth'

const router = express.Router()

router.get('/', auth, getAccounts)
router.post('/', auth, addAccount)

export default router
