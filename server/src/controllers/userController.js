import User from '../models/userModel.js'
import apiResponse from 'quick-response'
import { signToken } from '../utils/signToken.js'

// @desc  Get all user
// @route GET /api/v1/user/
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    return res.status(200).json(
      apiResponse(200, 'all users', {
        admin: users,
        result: users.length,
      })
    )
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: `${error.message}` })
  }
}

// @desc  Get all teachers
// @route GET /api/v1/teacher
const getTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: 'teacher' })
    return res.status(200).json(
      apiResponse(200, 'All teachers list', {
        teacher: teachers,
        result: teachers.length,
      })
    )
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: `${error.message}` })
  }
}

// @desc  Get a single user
// @route GET /api/v1/user/:id
const getUser = async (req, res) => {}

// @desc  Create an user
// @route POST /api/v1/user/
const createUser = async (req, res) => {
  try {
    const { fullname, email, password, phone, role } = req.body

    if (
      [fullname, email, password, phone, role].some(
        (field) => field?.trim() === ''
      )
    ) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'please enter all required fields' })
    }

    // check user is already exist or not
    const userFound = await User.findOne({ email: email })
    if (userFound !== null) {
      return res.status(400).json(apiResponse(400, 'Email already exist'))
    }

    // create new user
    const newUser = await User.create({
      fullname: fullname,
      email: email,
      password: password,
      phone: phone,
      role: role,
    })
    const token = signToken(newUser._id)
    return res
      .status(201)
      .json(apiResponse(201, 'User created', { data: newUser, token: token }))
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: `${error.message}` })
  }
}

// @desc  Update an user
// @route PATCH /api/v1/user/:id
const updateUser = async (req, res) => {}

// @desc  Delete an user
// @route DELETE /api/v1/user/:id
const deleteUser = async (req, res) => {}

export { getAllUsers, createUser, updateUser, deleteUser, getUser, getTeachers }
