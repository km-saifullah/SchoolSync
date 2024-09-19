import apiResponse from 'quick-response'
import User from '../models/userModel.js'
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
    const user = await User.findOne({ email })

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res
        .status(401)
        .json(apiResponse(401, 'Incorrect email or password'))
    }

    // send token to the user
    const token = signToken(user._id)

    return res
      .status(200)
      .json(apiResponse(200, 'Login Susscessful', { data: user, token: token }))
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: `${error.message}` })
  }
}
