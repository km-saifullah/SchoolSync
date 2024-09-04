import mongoose, { Schema } from 'mongoose'

const adminSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
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

const Admin = mongoose.model('Admin', adminSchema)

export default Admin
