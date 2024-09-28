import { Router } from 'express'
import {
  addStudent,
  deleteStudent,
  getStudentById,
  getStudents,
  getStudentsByClassAndSection,
  updateStudent,
} from '../controllers/studentController.js'

const router = Router()

router.route('/').get(getStudents).post(addStudent)
router.route('/searchstudents').get(getStudentsByClassAndSection)
router
  .route('/:id')
  .get(getStudentById)
  .patch(updateStudent)
  .delete(deleteStudent)

export default router
