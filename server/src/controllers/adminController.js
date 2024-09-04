import Admin from '../models/adminModel.js'
import apiResponse from 'quick-response'

// @desc  Get all admin
// @route GET /api/v1/admin/
const getAllAdmin = async (req, res) => {
  try {
    return res.send('All Admins')
  } catch (error) {}
}

// @desc  Get a single admin
// @route GET /api/v1/admin/:id
const getAdmin = async (req, res) => {}

// @desc  Create an admin
// @route POST /api/v1/admin/
const createAdmin = async (req, res) => {
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

    // check admin is already exist or not
    const findAdmin = await Admin.findOne({ email: email })
    if (findAdmin !== null) {
      return res.status(400).json(apiResponse(400, 'Email already exist'))
    }

    // create new admin
    const newUser = await Admin.create({
      fullname: fullname,
      email: email,
      password: password,
      phone: phone,
      role: role,
    })
    return res.status(201).json(apiResponse(201, 'User created', { newUser }))
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: `${error.message}` })
  }
}

// @desc  Update an admin
// @route PATCH /api/v1/admin/:id
const updateAdmin = async (req, res) => {}

// @desc  Delete an admin
// @route DELETE /api/v1/admin/:id
const deleteAdmin = async (req, res) => {}

export { getAllAdmin, createAdmin, updateAdmin, deleteAdmin, getAdmin }
