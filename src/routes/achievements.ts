import * as express from 'express'

import { addAchievement } from '../controller/AchievementController'
import { auth } from '../middleware/auth'

const router = express.Router()

router.post('/', auth, addAchievement)

export default router
