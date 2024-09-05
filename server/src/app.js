import express from 'express'
import adminRoute from './routes/adminRoute.js'
import { signIn } from './controllers/authController.js'

const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/api/v1/admin', adminRoute)

export default app
