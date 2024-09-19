import { Router } from 'express'
import {
  addStudent,
  deleteStudent,
  getStudent,
  getStudents,
  updateStudent,
} from '../controllers/studentController.js'

const router = Router()

router.route('/').get(getStudents).post(addStudent)
router.route('/:id').get(getStudent).patch(updateStudent).delete(deleteStudent)

export default router
