import mongoose from 'mongoose'
import Story from '../models/story.js'
import User from '../models/user.js'

export const addStory = (payload) => {
  const story = new Story()
  story.userId = new mongoose.mongo.ObjectId(payload.userId)
  story.createdAt = new Date()
  story.updatedAt = new Date()
  story.imageURL = payload.imageURL
  story.title = payload.title
  story.description = payload.description
  story.langRegion = payload.langRegion

  return new Promise((resolve, reject) => {
    story.save((err, savedDoc) => {
      if (err) {
        return reject(err)
      }

      resolve(savedDoc)
    })
  })
}

export const listStories = (skip, limit, langRegion, userId = null) => {
  let aggregate = []
  const primeQuery = [
    { $sort: { createdAt: -1 } },
	   	{ $skip: skip },
	   	{ $limit: limit },
	   	{
		    $lookup: {
		         from: User.collection.name,
		         localField: 'userId',
		         foreignField: '_id',
		         as: 'user'
		    }
	  	}
  	]

  	const match = {}
  if (langRegion) {
    match.langRegion = langRegion
  }

  if (userId) {
    match.userId = new mongoose.mongo.ObjectId(userId)
  }

  if (Object.keys(match).length) {
    aggregate.push({ $match: match })
  }

  aggregate = [
    ...aggregate,
    ...primeQuery
  ]

  return new Promise((resolve, reject) => {
    Story.aggregate(aggregate).exec((err, list) => {
      if (err) {
        return reject(err)
      }

      resolve(list)
    })
  })
}

export const getStory = (id) => {
  return new Promise((resolve, reject) => {
    Story.aggregate([
		   { $match: { _id: new mongoose.mongo.ObjectId(id) } },
		   {
		    $lookup: {
		         from: User.collection.name,
		         localField: 'userId',
		         foreignField: '_id',
		         as: 'user'
		    }
		  }
    ]).exec((err, list) => {
      if (err) {
        return reject(err)
      }

      if (!list.length) {
        return reject('Unable to find the story with given id')
      }

      resolve(list[0])
    })
  })
}

export const deleteStory = (storyId, userId) => {
  return new Promise((resolve, reject) => {
    Story.deleteOne({
      _id: new mongoose.mongo.ObjectId(storyId),
      userId: new mongoose.mongo.ObjectId(userId)
    }, (err, resp) => {
      if (err) {
        return reject(err)
      }

      resolve(resp.deletedCount)
    })
  })
}
