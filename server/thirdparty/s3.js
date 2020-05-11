import AWS from 'aws-sdk'
import S3Stream from 's3-upload-stream'

const s3 = new AWS.S3({
  region: 'eu-west-1'
})

const s3Stream = S3Stream(new AWS.S3({
  region: 'eu-west-1'
}))

export const streamFileToS3 = (filePrePath, readStream, key, callback) => {
  if (filePrePath) {
    key = `${filePrePath}/${key}`
  }

  const upload = s3Stream.upload({
    Bucket: process.env.S3_BUCKET,
    ACL: 'public-read',
    Key: key
  })

  // Handle errors.
  upload.on('error', function (err) {
    callback(err, null)
  })

  // Handle progress.
  upload.on('part', function (details) {
    console.log(details)
  })

  // Handle upload completion.
  upload.on('uploaded', function (details) {
    callback(null, details)
  })

  // Pipe the Readable stream to the s3-upload-stream module.
  readStream.pipe(upload)
}

export const deleteFileFromS3 = (key) => {
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: key
  }

  return new Promise((resolve, reject) => {
    s3.deleteObject(params, (err, data) => {
      if (err) {
        return reject(err)
      }

      resolve(data)
    })
  })
}
