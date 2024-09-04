import { Router } from 'express'
import {
  createAdmin,
  deleteAdmin,
  getAdmin,
  getAllAdmin,
  updateAdmin,
} from '../controllers/adminController.js'
import { signIn } from '../controllers/authController.js'

const router = Router()

// authentication routes
router.route('/signin').post(signIn)

router.route('/').get(getAllAdmin).post(createAdmin)
router.route('/:id').get(getAdmin).patch(updateAdmin).delete(deleteAdmin)

export default router
