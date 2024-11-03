import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const teacherSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    designation: {
      type: String,
    },
    subject: {
      type: String,
    },
    role: {
      type: String,
      default: 'teacher',
    },
    joiningDate: {
      type: String,
    },
  },
  { timestamps: true }
)

// hash password
teacherSchema.pre('save', async function (next) {
  // only run thus function if password was actually modified
  if (!this.isModified('password')) return next()

  // hash password with cost of 12
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

// check password is correct or not
teacherSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

const Teacher = mongoose.model('Teacher', teacherSchema)

export default Teacher
