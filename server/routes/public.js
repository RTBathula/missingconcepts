import express from 'express'
import * as storyAPI from '../services/story.js'
import * as voteAPI from '../services/vote.js'

const router = express.Router()

router.get('/story/list', (req, res) => {
  const skip = parseInt(req.query.skip) || 0
  const limit = parseInt(req.query.limit) || 30
  const langRegion = req.query.langRegion || null

  storyAPI.listStories(skip, limit, langRegion, null).then((list) => {
    return res.status(200).send(list)
  }).catch((e) => {
    return res.status(400).send(e)
  })
})

router.get('/story/:id', (req, res) => {
  const { id } = req.params
  storyAPI.getStory(id).then((story) => {
	    return res.status(200).send(story)
  }).catch((e) => {
	    return res.status(400).send(e)
  })
})

router.get('/vote/count/:storyId/:type', (req, res) => {
  const { storyId, type } = req.params

  if (!storyId || !type) {
    return res.status(400).send('storyId and type are required')
  }

  voteAPI.countVotes(storyId, type).then((count) => {
	    return res.status(200).send({ count })
  }).catch((e) => {
    console.log(e)
	    return res.status(400).send(e)
  })
})

export default router
