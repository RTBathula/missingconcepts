import jwtDecode from 'jwt-decode'
import { verifyJWTToken } from './jwt.js'

const extractTokenFromBearer = (req) => {
  const { authorization } = req.headers
  return (authorization || '').split(' ')
}

export const authMiddleware = (req, res, next) => {
  const parts = extractTokenFromBearer(req)

  if (parts[0] !== 'Bearer') {
    return res.status(400).send('Invalid jwt token')
  }

  verifyJWTToken(parts[1], 'JWT_ACCESS_SECRET').then(() => {
    return next()
  }).catch((e) => {
    return res.status(401).send(e)
  })
}

export const getUserFromJWTToken = (req) => {
  const parts = extractTokenFromBearer(req)
  if (parts[0] !== 'Bearer') {
    return null
  }

  const token = parts[1]
  return (token ? jwtDecode(token) : {})
}
