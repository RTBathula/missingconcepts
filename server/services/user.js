import User from '../models/user.js'
import { createJWTClaims } from '../utils/jwt.js'

export const createOrGetUser = (payload) => {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({
      sub: payload.sub
    }, {
      createdAt: new Date(),
      updatedAt: new Date(),
      sub: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture
    }, {
      upsert: true,
      new: true
    }, (err, user) => {
      if (err) {
        return reject(err)
      }

      resolve(JSON.parse(JSON.stringify(user)))
    })
  })
}
