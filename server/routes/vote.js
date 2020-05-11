import express from 'express'
import { getUserFromJWTToken } from '../utils/auth.js'
import * as voteAPI from '../services/vote.js'

const router = express.Router()

router.post('/', (req, res) => {
  const { storyId, type } = req.body
  const userId = getUserFromJWTToken(req).user._id

  if (!storyId || !type) {
    return res.status(400).send('storyId and type are required')
  }

  voteAPI.addOrRemoveVote(userId, storyId, type).then((story) => {
	    return res.status(200).send(story)
  }).catch((e) => {
    console.log(e)
	    return res.status(400).send(e)
  })
})

export default router
