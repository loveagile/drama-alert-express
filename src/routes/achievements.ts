import * as express from 'express'

import {
  addAchievement,
  editAchievement,
  deleteAchievement,
} from '../controller/AchievementController'
import { auth } from '../middleware/auth'

const router = express.Router()

router.post('/', auth, addAchievement)
router.put('/:id', auth, editAchievement)
router.delete('/:id', auth, deleteAchievement)

export default router
