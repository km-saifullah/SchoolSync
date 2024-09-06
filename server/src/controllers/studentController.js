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
    
  }
}

// @desc  Get all Students
// @route api/v1/student/:id
const getStudent = async (req, res) => {}

// @desc  Get all Students
// @route api/v1/student
const addStudent = async (req, res) => {}

// @desc  Get all Students
// @route api/v1/student/:id
const updateStudent = async (req, res) => {}

// @desc  Get all Students
// @route api/v1/student/:id
const deleteStudent = async (req, res) => {}

export { getStudents, getStudent, addStudent, updateStudent, deleteStudent }
