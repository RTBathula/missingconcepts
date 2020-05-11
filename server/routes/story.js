import express from 'express'
import Busboy from 'busboy'
import { getUserFromJWTToken } from '../utils/auth.js'
import { streamFileToS3, deleteFileFromS3 } from '../thirdparty/s3.js'
import * as storyAPI from '../services/story.js'
import * as voteAPI from '../services/vote.js'

const router = express.Router()

router.post('/', (req, res) => {
  const { filePrePath } = req.query
  const inputReq = {}

  const busboy = new Busboy({ headers: req.headers })
  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    streamFileToS3(filePrePath, file, filename, (err, details) => {
      	if (err) {
      		return res.status(400).send(err)
      	}

      inputReq.userId = getUserFromJWTToken(req).user._id
      inputReq.imageURL = details.Location
      storyAPI.addStory(inputReq).then((story) => {
        return res.status(200).send(story)
      }).catch((e) => {
        return res.status(400).send(e)
      })
    })
  })

  busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
    console.log('Field [' + fieldname + ']: value: ' + val)
    inputReq[fieldname] = val
  })

  busboy.on('finish', () => {
    console.log('Done parsing form!')
  })

  req.pipe(busboy)
})

router.get('/list', (req, res) => {
  const skip = parseInt(req.query.skip) || 0
  const limit = parseInt(req.query.limit) || 30
  const byUser = parseInt(req.query.byUser) || 0
  const langRegion = req.query.langRegion || null

  let userId = null
  if (byUser) {
    userId = getUserFromJWTToken(req).user._id
  }

  storyAPI.listStories(skip, limit, langRegion, userId).then((list) => {
    return res.status(200).send(list)
  }).catch((e) => {
    return res.status(400).send(e)
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  const userId = getUserFromJWTToken(req).user._id

  storyAPI.deleteStory(id, userId).then((resp) => {
    // Delete votes
    voteAPI.deleteVoteByStory(id)

    return res.status(200).send({ resp })
  }).catch((e) => {
    console.log(e)
    return res.status(400).send(e)
  })
})

export default router
