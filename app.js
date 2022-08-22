import createError from 'http-errors'
import express from 'express'
import path, { dirname } from 'path'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url'
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import logger from './utilities/logger.js'
import routes from './routes'
import rateLimiter from './middleware/rateLimiter.js'

import swaggerUI from 'swagger-ui-express'
import swaggerDocsConfig from './swagger/config.js'

import './database'
import './queueConsumers'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(rateLimiter)
app.use(compression())
app.use(cookieParser())
app.use(cors())
app.use(helmet())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocsConfig))

app.use(morgan('combined', {
  stream: logger.stream,
  skip: (req, res) => { // Skip to log health endpoint
    return req.url === '/health'
  }
}))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app
