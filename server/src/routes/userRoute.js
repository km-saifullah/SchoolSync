import { Router } from 'express'
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
  getUserById,
} from '../controllers/userController.js'
import { signIn } from '../controllers/authController.js'

const router = Router()

// authentication routes
router.route('/signin').post(signIn)

router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').patch(updateUser).delete(deleteUser)
router.route('/single-user').get(getUserById)

export default router
