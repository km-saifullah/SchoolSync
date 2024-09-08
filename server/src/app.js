import express from 'express'
import cors from 'cors'
import adminRoute from './routes/adminRoute.js'
import studentRouter from './routes/studentRoutes.js'

const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: '*' }))

// routes
app.use('/api/v1/admin', adminRoute)
app.use('/api/v1/student', studentRouter)

export default app
