const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }
  ]
})

const Teacher = mongoose.model('Teacher', teacherSchema)
module.exports = Teacher
