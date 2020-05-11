import mongoose from 'mongoose'
import Vote from '../models/vote.js'

export const countVotes = (storyId, type) => {
  return new Promise((resolve, reject) => {
    Vote.countDocuments({
      storyId: new mongoose.mongo.ObjectId(storyId),
      type
    }, (err, count) => {
      if (err) {
        return reject(err)
      }

      resolve(count)
    })
  })
}

export const findVote = (userId, storyId, type) => {
  return new Promise((resolve, reject) => {
    Vote.findOne({
      userId: new mongoose.mongo.ObjectId(userId),
      storyId: new mongoose.mongo.ObjectId(storyId),
      type
    }, (err, vote) => {
      if (err) {
        return reject(err)
      }

      resolve(vote)
    })
  })
}

export const addVote = (userId, storyId, type) => {
  const vote = new Vote()
  vote.createdAt = new Date()
  vote.updatedAt = new Date()
  vote.userId 	 = new mongoose.mongo.ObjectId(userId)
  vote.storyId 	 = new mongoose.mongo.ObjectId(storyId)
  vote.type = type

  return new Promise((resolve, reject) => {
    vote.save((err, savedDoc) => {
      if (err) {
        return reject(err)
      }

      resolve(savedDoc)
    })
  })
}

export const deleteVote = (userId, storyId, type) => {
  return new Promise((resolve, reject) => {
    Vote.deleteOne({
      userId: new mongoose.mongo.ObjectId(userId),
      storyId: new mongoose.mongo.ObjectId(storyId),
      type
    }, (err, resp) => {
      if (err) {
        return reject(err)
      }

      resolve(resp.deletedCount)
    })
  })
}

export const deleteVoteByStory = (storyId) => {
  return new Promise((resolve, reject) => {
    Vote.deleteOne({
      storyId: new mongoose.mongo.ObjectId(storyId)
    }, (err, resp) => {
      if (err) {
        return reject(err)
      }

      resolve(resp.deletedCount)
    })
  })
}

export const addOrRemoveVote = (userId, storyId, type) => {
  let voteActionType = null
  return new Promise((resolve, reject) => {
    findVote(userId, storyId, type).then((vote) => {
      if (vote) {
        voteActionType = 'removedVote'
        return deleteVote(userId, storyId, type)
      }

      voteActionType = 'addedVote'
      return addVote(userId, storyId, type)
    }).then((final) => {
      resolve(voteActionType)
    }).catch((e) => {
      reject(e)
    })
  })
}
