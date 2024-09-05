import apiResponse from 'quick-response'
import Admin from '../models/adminModel.js'
import { signToken } from '../utils/signToken.js'

// @desc  Admin Signin
// @route POST /api/v1/admin/login
export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // check email and password are actually exist
    if (!email || !password) {
      return res
        .status(400)
        .json(apiResponse(400, 'Please provide email and password'))
    }

    // check if the admin exist or not
    const admin = await Admin.findOne({ email })
    console.log(admin)

    if (!admin || !(await admin.correctPassword(password, admin.password))) {
      return res
        .status(401)
        .json(apiResponse(401, 'Incorrect email or password'))
    }

    // send token to the admin
    const token = signToken(admin._id)

    return res
      .status(200)
      .json(
        apiResponse(200, 'Login Susscessful', { admin: admin, token: token })
      )
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: `${error.message}` })
  }
}
