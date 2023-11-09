const bcrypt = require('bcrypt')
//Router is a middleware function for routing, define related routes
const usersRouter = require('express').Router()
const User = require('../models/user')


// *Get all users
usersRouter.get('/', async (_, response) => {
  const users = await User.find({}).populate('projects')
  response.json(users)
})

// *Get specific user
usersRouter.get('/:id', async (request, response) => {
  // *Find user by id, then send the result back in response json

  const user = await User.findById(request.params.id).populate('projects')

  if (user) {
    response.json(user)
  }
  else {
    //*not found
    response.status(404).end()
  }

})

// *Create new user
usersRouter.post('/', async (request, response, next) => {
  const { firstname, lastname, email, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  // *User constructor
  const user = new User({
    firstname,
    lastname,
    email,
    passwordHash
  })

  if (firstname === undefined || lastname === undefined || email === undefined || password === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  // *Send to database method
  user.save().then(savedUser => {
    response.json(savedUser)
  })
    .catch(error => next(error))
})

// *Update user information
usersRouter.put('/:id', (request, response, next) => {
  const { username, password } = request.body

  //* runValidators key allows to validate client before submitting the update
  User.findByIdAndUpdate(request.params.id, { username, password }, { new: true, runValidators: true, context: 'query' })
    .then(updateUser => {
      response.json(updateUser)
    })
    .catch(error => next(error))
})

//* Delete user
usersRouter.delete('/:id', (request, response, next) => {
  User.findByIdAndRemove(request.params.id)
    // eslint-disable-next-line no-unused-vars
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = usersRouter