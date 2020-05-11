import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const schema = new Schema({
  id: ObjectId,
  userId: ObjectId,
  createdAt: Date,
  updatedAt: Date,
  imageURL: String,
  title: String,
  description: String,
  langRegion: String
}, { collection: 'story', versionKey: false })

export default mongoose.model('Story', schema)
