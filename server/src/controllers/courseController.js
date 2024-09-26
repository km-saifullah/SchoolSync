import apiResponse from 'quick-response'
import Course from '../models/courseModel.js'

// desc:  get all courses
// route: GET api/v1/course
const getCourses = async (req, res) => {
  try {
    let courses = await Course.find({}).populate({
      path: 'teacherInfo',
      select: '-password',
    })
    return res.status(200).json(
      apiResponse(200, 'all courses', {
        courses: courses,
        result: courses.length,
      })
    )
  } catch (error) {}
}

// desc:  create a course
// route: POST api/v1/course
const createCourse = async (req, res) => {
  try {
    const { courseName, courseCode, teacherInfo, courseDetails } = req.body

    // course already exist or not
    const courseFound = await Course.findOne({ courseCode })
    if (courseFound !== null) {
      return res.status(200).json(apiResponse(200, 'course already exist'))
    }

    // create new course
    const newCourse = await Course.create({
      courseName: courseName,
      courseCode: courseCode,
      teacherInfo: teacherInfo,
      courseDetails: courseDetails,
    })
    return res
      .status(201)
      .json(apiResponse(201, 'course created', { course: newCourse }))
  } catch (error) {
    return res
      .status(500)
      .json(
        apiResponse(500, 'Internal Server Error', { error: error.response })
      )
  }
}

export { getCourses, createCourse }
