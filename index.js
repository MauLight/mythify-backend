const app = require('./app')
// eslint-disable-next-line no-unused-vars
const { PORT, _ } = require('./utils/config')
const logger = require('./utils/logger')

// !Set server to listen to port
app.listen(PORT || 3001, () => {
  logger.info(`Server running on port ${PORT}`)
})