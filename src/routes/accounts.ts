import * as express from 'express'

import { getAccounts } from '../controller/AccountController'
import { auth } from '../middleware/auth'

const router = express.Router()

router.get('/', auth, getAccounts)

export default router
