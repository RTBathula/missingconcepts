import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const schema = new Schema({
  id: ObjectId,
  createdAt: Date,
  updatedAt: Date,
  userId: ObjectId,
  storyId: ObjectId,
  type: String
}, { collection: 'vote', versionKey: false })

export default mongoose.model('Vote', schema)
