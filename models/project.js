const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    minLength: 3,
    required: true
  },
  logline: {
    type: String,
    minLength: 100,
    required: true
  },
  genre: [
    {
      type: String,
      minLength: 3,
    }
  ],
  rating: {
    type: String
  },
  summary: {
    type: String,
    minLength: 200
  },
  myth: {
    type: { type: String },
    ticker: String
  },
  basis: {
    type: { type: String },
    ticker: String
  },
  protagonist: {
    type: { type: String },
    ticker: String
  },
  opposition: {
    type: { type: String },
    ticker: String
  },
  screenplay: {
    type: String
  },
  pitch: {
    type: String
  },
  poster: {
    type: String
  },
  wallpaper: {
    type: String
  },
  readers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project