const projectsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Project = require('../models/project')
const User = require('../models/user')
const { SECRET } = require('../utils/config')

const getTokenFrom = request => {
  const auth = request.get('authorization')
  //* startsWith method compares the element in auth (converted to string) with the string given; Bearer
  if (auth && auth.startsWith('Bearer ')) {
    //* replace method replaces the string given in 1st parameter with the string provided in 2nd parameter
    return auth.replace('Bearer ', '')
  }
}

// !EndPoints

// *Get all projects
projectsRouter.get('/', async (request, response) => {
  const projects = await Project.find({}).populate('writer')

  response.json(projects)
})

// *Get specific project
projectsRouter.get('/:id', (request, response, next) => {
  Project.findById(request.params.id).then(user => {
    if (user) {
      response.json(user)
    }
    else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

// *Post new project
projectsRouter.post('/', async (request, response) => {
  const { title, logline, genre, rating, summary, myth, basis, protagonist, opposition, screenplay, pitch, poster, wallpaper } = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), SECRET)
  if(!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  // !Provide id from client to search for user in database.
  const user = await User.findById(decodedToken.id)

  const project = new Project({
    // !Add found user's id to the project.
    writer: user.id,
    title,
    logline,
    genre,
    rating,
    summary,
    myth,
    basis,
    protagonist,
    opposition,
    screenplay,
    pitch,
    poster,
    wallpaper
  })

  if (!request.body) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const savedProject = await project.save()
  user.projects = user.projects.concat(savedProject._id)
  await user.save()

  response.status(201).json(savedProject)
})

//*Update project
projectsRouter.put('/:id', (request, response, next) => {

  const { writer, title, logline, genre, rating, summary, myth, basis, protagonist, opposition, screenplay, pitch, poster, wallpaper } = request.body

  Project.findByIdAndUpdate(request.params.id, { writer, title, logline, genre, rating, summary, myth, basis, protagonist, opposition, screenplay, pitch, poster, wallpaper }, { new: true, runValidators: true, context: 'query' })
    .then(updatedProject => response.json(updatedProject))
    .catch(error => next(error))
})

//*Delete project
projectsRouter.delete('/:id', (request, response, next) => {
  Project.findByIdAndRemove(request.params.id)
  // eslint-disable-next-line no-unused-vars
    .then(result => response.status(204).end())
    .catch(error => next(error))
})

module.exports = projectsRouter