import Student from '../models/studentModel.js'
import apiResponse from 'quick-response'

// @desc  Get all Students
// @route api/v1/student
const getStudents = async (req, res) => {
  try {
    const students = await Student.find()
    res
      .status(200)
      .json(
        apiResponse(200, 'All Students', { students, results: students.length })
      )
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: `${error.message}` })
  }
}

// @desc  Get all Students
// @route api/v1/student/:id
const getStudent = async (req, res) => {}

// @desc  Get all Students
// @route api/v1/student
const addStudent = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      studentClass,
      rollNumber,
      section,
      email,
      password,
      role,
      gender,
      dob,
      phone,
      address,
    } = req.body

    // generate student id
    let currentTime = new Date()
    const studentId = `${currentTime.getFullYear()}-${studentClass}-${section}-${rollNumber}`

    if (
      [
        firstName,
        lastName,
        studentClass,
        rollNumber,
        section,
        email,
        password,
        role,
        gender,
        dob,
        phone,
        address,
      ].some((field) => field?.trim() === '')
    ) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'please enter all required fields' })
    }

    // check student is already exist or not
    const studentFound = await Student.findOne({ email: email })
    if (studentFound !== null) {
      return res.status(400).json(apiResponse(400, 'Email already exist'))
    }

    // create new student
    const newUser = await Student.create({
      firstName: firstName,
      lastName: lastName,
      studentClass: studentClass,
      rollNumber: rollNumber,
      section: section,
      email: email,
      password: password,
      role: role,
      gender: gender,
      dob: dob,
      phone: phone,
      address: address,
      studentId: studentId,
    })
    // const token = signToken(newUser._id)
    return res
      .status(201)
      .json(apiResponse(201, 'Student created', { data: newUser }))
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: `${error.message}` })
  }
}

// @desc  Get all Students
// @route api/v1/student/:id
const updateStudent = async (req, res) => {}

// @desc  Get all Students
// @route api/v1/student/:id
const deleteStudent = async (req, res) => {}

export { getStudents, getStudent, addStudent, updateStudent, deleteStudent }
