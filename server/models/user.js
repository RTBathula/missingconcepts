import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const schema = new Schema({
  id: ObjectId,
  createdAt: Date,
  updatedAt: Date,
  sub: String,
  email: String,
  name: String,
  picture: String
}, { collection: 'user', versionKey: false })

export default mongoose.model('User', schema)
