import { Router } from 'express'
import { getTeachers } from '../controllers/userController.js'

const router = Router()

router.route('/').get(getTeachers)

export default router
