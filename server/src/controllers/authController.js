import apiResponse from 'quick-response'
import Admin from '../models/adminModel.js'



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
    const admin = await Admin.findOne({ email: email })
    if (!admin || (await admin.correctPassword(password, admin.password))) {
      return res
        .status(400)
        .json(apiResponse(400, 'Incorrect email or password'))
    }

    return res
      .status(200)
      .json(apiResponse(200, 'Login Susscessful', { admin }))
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: `${error.message}` })
  }
}
