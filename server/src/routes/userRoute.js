import { Router } from 'express'
import {
  createUser,
  deleteUser,
  getUser,
  getAllUsers,
  updateUser,
} from '../controllers/userController.js'
import { signIn } from '../controllers/authController.js'

const router = Router()

// authentication routes
router.route('/signin').post(signIn)

router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

export default router
