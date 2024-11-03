import Teacher from '../models/teacherModel.js'
import apiResponse from 'quick-response'

// @desc:  create teacher
// @route: POST /api/v1/teachers
const createTeacher = async (req, res) => {
  try {
    const { fullname, email, password, phone, address, dob } = req.body

    const teacherFound = await Teacher.findOne({ email })
    if (teacherFound) {
      return res.status(400).json(apiResponse(400, 'teacher already exist'))
    }

    const teacher = await Teacher.create({
      fullname,
      email,
      password,
      phone,
      address,
      dob,
    })

    return res
      .status(201)
      .json(apiResponse(201, 'teacher created', { teacher }))
  } catch (error) {
    return res
      .status(400)
      .json(apiResponse(400, 'server error', { error: error.message }))
  }
}

export { createTeacher }
