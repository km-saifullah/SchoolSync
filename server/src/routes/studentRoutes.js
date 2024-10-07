import { Router } from 'express'
import {
  addStudent,
  deleteStudent,
  getStudentById,
  getStudents,
  getStudentsByClassAndSection,
  updateStudent,
} from '../controllers/studentController.js'
import upload from '../middlewares/multerMiddleware.js'

const router = Router()

router.route('/').get(getStudents).post(addStudent)
router.route('/searchstudents').get(getStudentsByClassAndSection)
router
  .route('/:id')
  .get(getStudentById)
  .patch(upload.single('avatar'), updateStudent)
  .delete(deleteStudent)

export default router
