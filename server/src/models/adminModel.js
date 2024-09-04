import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const adminSchema = new Schema(
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

adminSchema.pre('save', async function (next) {
  // only run thus function if password was actually modified
  if (!this.isModified('password')) return next()

  // hash password with cost of 12
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

const Admin = mongoose.model('Admin', adminSchema)

export default Admin
