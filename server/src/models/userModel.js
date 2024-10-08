import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: [true, 'Please provide your fullname'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: 8,
    },
    phone: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

// hash password
userSchema.pre('save', async function (next) {
  // only run thus function if password was actually modified
  if (!this.isModified('password')) return next()

  // hash password with cost of 12
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

// check password is correct or not
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model('User', userSchema)

export default User
