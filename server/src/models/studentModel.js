import mongoose, { Schema } from 'mongoose'

const studentSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    studentClass: {
      type: String,
      required: true,
    },
    rollNumber: {
      type: Number,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
    },
    gender: {
      type: String,
    },
    dob: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    studentId: {
      type: String,
    },
  },
  { timestamps: true }
)

const Student = mongoose.model('Student', studentSchema)

export default Student
