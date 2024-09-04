import { Router } from 'express'
import {
  createAdmin,
  deleteAdmin,
  getAdmin,
  getAllAdmin,
  updateAdmin,
} from '../controllers/adminController.js'

const router = Router()

router.route('/').get(getAllAdmin).post(createAdmin)
router.route('/:id').get(getAdmin).patch(updateAdmin).delete(deleteAdmin)

export default router
