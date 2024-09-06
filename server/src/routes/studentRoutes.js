import { Router } from 'express'
import {
  addStudent,
  deleteStudent,
  getStudent,
  getStudents,
} from '../controllers/studentController.js'
import { updateAdmin } from '../controllers/adminController.js'

const router = Router()

router.route('/').get(getStudents).post(addStudent)
router.route('/:id').get(getStudent).patch(updateAdmin).delete(deleteStudent)

export default router
