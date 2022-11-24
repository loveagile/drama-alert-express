import * as express from 'express'

import { addComment } from '../controller/CommentController'
import { auth } from '../middleware/auth'

const router = express.Router()

router.post('/', auth, addComment)

export default router
