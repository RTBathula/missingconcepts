import express from 'express';
import * as userAPI from '../services/user.js';
import { createAccessAndRefreshTokens } from '../utils/jwt.js';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const router = express.Router()

router.post('/tokensignin', (req, res) => {
  const { idToken } = req.body

  client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID
  }).then((ticket) => {
    const payload = ticket.getPayload()
    if (!payload.email_verified) {
      return res.status(400).send('This email is not verified')
    }

    userAPI.createOrGetUser(payload).then((user) => {
      const tokens = createAccessAndRefreshTokens(user)
      return res.status(200).send(tokens)
    }).catch((e) => {
      return res.status(400).send(e)
    })
  }).catch((e) => {
    console.log(e)
    return res.status(400).send(e)
  })
})

export default router
