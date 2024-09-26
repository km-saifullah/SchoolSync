import { Router } from 'express'
import { createCourse, getCourses } from '../controllers/courseController.js'

const router = Router()

router.route('/').get(getCourses).post(createCourse)

export default router
