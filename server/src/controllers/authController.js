import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { jwtSecret } from '../config/index.js'
import { signToken } from '../utils/signToken.js'
import apiResponse from 'quick-response'
import Teacher from '../models/teacherModel.js'

// @desc: is user signin
// @route
const isSignIn = async (req, res, next) => {
  // 1) getting token & check of it's there
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(apiResponse(401, 'you are not logged in'))
  }

  // 2) verification token
  const decoded = jwt.verify(token, jwtSecret)

  // 3) check if user still exists
  const currentUser = await User.findById(decoded.id)
  if (!currentUser) {
    return next(
      apiResponse(401, 'the user belonging of this token does not exist')
    )
  }

  // 4) check if user changed password after the JWT was issued
  // if (currentUser.changedPasswordAfter(decoded.iat)) {
  //   return next(
  //     apiResponse(401, 'User rescently changed password!plase log in again')
  //   )
  // }

  // grant access to protected route
  req.user = currentUser
  next()
}

// @desc: check the role
const restrict = (req, res, next) => {
  try {
    let role = req.user.role
    if (role === 'admin' || role === 'stuff') {
      next()
    }
  } catch (error) {
    return res
      .status(400)
      .json(apiResponse(400, 'access denied', { error: error.message }))
  }
}

// @desc  signin users, stuff, teacher, student
// @route POST /api/v1/admin/login
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body

    // check email and password are actually exist
    if ((!email && email === '') || (!password && password === '')) {
      return res
        .status(400)
        .json(apiResponse(400, 'Please provide email and password'))
    }

    // check if the user exist or not
    const user = await User.findOne({ email })
    const teacherFound = await Teacher.findOne({ email })

    if (user && (user.role === 'admin' || user.role === 'stuff')) {
      if (!user || !(await user.correctPassword(password, user.password))) {
        return res
          .status(401)
          .json(apiResponse(401, 'incorrect email or password'))
      }
      // send token to the user
      const token = signToken(user.fullname, user.email, user.role, user._id)

      return res
        .status(200)
        .json(
          apiResponse(200, 'Login Susscessful', { data: user, token: token })
        )
    }
    if (
      !teacherFound ||
      !(await teacherFound.correctPassword(password, teacherFound.password))
    ) {
      return res
        .status(401)
        .json(apiResponse(401, 'incorrect email or password'))
    }
    const token = signToken(
      teacherFound.fullname,
      teacherFound.email,
      teacherFound.role,
      teacherFound._id
    )

    return res.status(200).json(
      apiResponse(200, 'Login Susscessful', {
        data: teacherFound,
        token: token,
      })
    )
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: `${error.message}` })
  }
}

export { isSignIn, restrict }
