// eslint-disable-next-line no-unused-vars
const { PORT, MONGODB_URL } = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')

// !Router takes relative path api/users
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const lessonsRouter = require('./controllers/lessons')
// const coursesRouter = require('./controllers/courses')
const projectsRouter = require('./controllers/projects')
// const teachersRouter = require('./controllers/teachers')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('Connecting to:', MONGODB_URL)

mongoose.connect(MONGODB_URL)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => logger.error('error connecting to MongoDB:', error.message))

// !Allow cors connections, serve static page on local host, parse request.body from JSON to Js object
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

// !Send incoming requests to routers
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/projects', projectsRouter)
// app.use('/api/courses', coursesRouter)
// app.use('/api/teachers', teachersRouter)
app.use('/api/lessons', lessonsRouter)

// ! Error handling middlewares
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
