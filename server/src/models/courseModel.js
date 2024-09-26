import mongoose, { Schema } from 'mongoose'

const courseSchema = new Schema(
  {
    courseName: {
      type: String,
      required: true,
      lowercase: true,
    },
    courseCode: {
      type: String,
      required: true,
    },
    classNumber: {
      type: Number,
    },
    classSection: {
      type: String,
    },
    teacherInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    courseDuration: {
      type: Number,
      default: 1,
    },
    roomNumber: {
      type: Number,
    },
    courseDetails: {
      type: String,
    },
    lesson: {
      type: Number,
    },
    courseProgress: {
      type: Number,
    },
  },
  { timestamps: true }
)

const Course = mongoose.model('Course', courseSchema)

export default Course
