import express from 'express'
import Busboy from 'busboy'
import { streamFileToS3, deleteFileFromS3 } from '../thirdparty/s3.js'

const router = express.Router()

router.post('/upload', (req, res) => {
  const { filePrePath } = req.query
  const busboy = new Busboy({ headers: req.headers })
  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    streamFileToS3(filePrePath, file, filename, (err, details) => {
      	if (err) {
      		return res.status(400).send(err)
      	}

      	return res.status(200).send(details.Location)
    })
  })

  busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
    console.log('Field [' + fieldname + ']: value: ' + val)
  })

  busboy.on('finish', () => {
    console.log('Done parsing form!')
  })

  req.pipe(busboy)
})

router.delete('/', (req, res) => {
  const { path } = req.body
  deleteFileFromS3(path).then((resp) => {
    return res.status(200).send(resp)
  }).catch((e) => {
    return res.status(400).send(e)
  })
})

export default router
