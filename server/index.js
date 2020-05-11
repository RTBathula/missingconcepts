import dotenv from 'dotenv';
import mongoose from 'mongoose'
import express from 'express'
import consola from 'consola'
import { Nuxt, Builder } from 'nuxt'
import cors from 'cors'
import bodyParser from 'body-parser'
import config from '../nuxt.config.js'
import { isJsonParsable } from './utils/type-validator.js'
import routes from './routes/index.js'

dotenv.config();

const app = express()
config.dev = (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging') 

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use((req, res, next) => {
  if (req.text && isJsonParsable(req.text)) {
    req.body = JSON.parse(req.text)
  }

  if (req.body && typeof (req.body) === 'string' && isJsonParsable(req.body)) {
    req.body = JSON.parse(req.body)
  }

  next()
})

app.use('/', routes)
app.get('/ping', (req, res) => {
  return res.status(200).send('Missing-Concepts is up and running')
});

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  } catch (e) {
    console.log(e);
    process.exit(1)
  }

  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  try {
    await nuxt.ready()
  } catch (e) {
    console.log(e);
    process.exit(1)
  }
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)

    try {
      await builder.build()
    } catch (e) {
      console.log(e);
      process.exit(1)
    }
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.set('port', process.env.PORT || 3000);
  app.listen(app.get('port'), () => { 
    consola.ready({
      message: `Missing-Concepts server listening on port:${app.get('port')}`,
      badge: true
    })
  })
  
})().catch( e => { console.error(e) } )
