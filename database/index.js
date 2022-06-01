'use strict'

import mongoose from 'mongoose'
import logger from '../utilities/logger.js'
import config from '../config'

mongoose.connect(config.DATABASE.MONGO.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', (err) => {
  process.exit('Wrong ')
  logger.error({
    message: `MongoDB connection error - ${err.toString()}`,
    level: 'error'
  })
})

db.once('open', () => logger.log({
  message: 'MongoDB connected',
  level: 'info'
}))
