import express from 'express'
import { authMiddleware } from '../utils/auth.js'
import fileRoute from './file.js'
import publicRoute from './public.js'
import user from './user.js'
import story from './story.js'
import vote from './vote.js'
const router = express.Router()

router.use('/public', publicRoute)
router.use('/user', user)
router.use('/file', authMiddleware, fileRoute)
router.use('/story', authMiddleware, story)
router.use('/vote', authMiddleware, vote)
export default router
