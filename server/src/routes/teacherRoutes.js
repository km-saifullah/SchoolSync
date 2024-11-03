import { Router } from 'express'
import { getTeachers } from '../controllers/userController.js'
import { createTeacher } from '../controllers/teacherController.js'
import { isSignIn, restrict } from '../controllers/authController.js'

const router = Router()

router.route('/').get(getTeachers).post(isSignIn, restrict, createTeacher)

export default router
