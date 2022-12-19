import * as express from 'express'

import { login, register, getCurrentUser } from '../controller/AuthController'
import { auth } from '../middleware/auth'

const router = express.Router()

router.post('/login', login)
router.post('/register', register)
router.get('/currentuser', auth, getCurrentUser)

export default router
