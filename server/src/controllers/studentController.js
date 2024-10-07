import Student from '../models/studentModel.js'
import apiResponse from 'quick-response'
import cloudinaryUpload from '../services/cloudinaryUpload.js'

// @desc  Get all Students
// @route api/v1/student
const getStudents = async (req, res) => {
  try {
    const students = await Student.find()
    return res
      .status(200)
      .json(
        apiResponse(200, 'All Students', { students, results: students.length })
      )
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: `${error.message}` })
  }
}

// @desc  get students by section + class
// @route api/v1/student/searchstudents
const getStudentsByClassAndSection = async (req, res) => {
  try {
    const { studentclass, section } = req.headers

    const studentsBySectionAndClass = await Student.find({
      studentClass: studentclass,
      section: section,
    })

    if (!studentsBySectionAndClass) {
      return res.status(404).json(apiResponse(404, 'no students found'))
    }

    return res
      .status(200)
      .json(apiResponse(200, 'success', { studentsBySectionAndClass }))
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: `${error.message}` })
  }
}

// @desc  Get all Students
// @route api/v1/student/:id
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params

    const studentFound = await Student.findById({ _id: id })

    if (!studentFound) {
      return res
        .status(404)
        .json(apiResponse(404, 'no student found by this id'))
    }

    return res
      .status(200)
      .json(apiResponse(200, 'student found by this id', { studentFound }))
  } catch (error) {}
}

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
const updateStudent = async (req, res) => {
  try {
    console.log(req.file)
    // check file uploaded or not
    if (req.file) {
      const { path } = req.file
      const user = await Student.findById('66db3d5d3567141273a10654')
      console.log(user)

      const cloudinaryImage = await cloudinaryUpload(
        path,
        user.firstName,
        'avatar'
      )
      console.log(cloudinaryImage)
      // cloudinaryImage.optimizeUrl || cloudinaryImage.uploadResult || cloudinaryImage.uploadResult.public_id
      user.profileImage = cloudinaryImage.optimizeUrl
      user.publicId = cloudinaryImage.uploadResult.public_id
      await user.save()

      return res
        .status(200)
        .json(apiResponse(200, 'profile image upload successfully'))
    }
  } catch (error) {
    return res
      .status(500)
      .json(apiResponse(500, 'internal server error', { error: error.message }))
  }
}

// @desc  Get all Students
// @route api/v1/student/:id
const deleteStudent = async (req, res) => {}

export {
  getStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
  getStudentsByClassAndSection,
}
