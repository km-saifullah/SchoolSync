import express from 'express'
import cors from 'cors'
import userRoute from './routes/userRoute.js'
import studentRouter from './routes/studentRoutes.js'
import courseRouter from './routes/courseRoutes.js'
import teacherRouter from './routes/teacherRoutes.js'

const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))
app.use(cors({ origin: '*' }))

// routes
app.use('/api/v1/users', userRoute)
app.use('/api/v1/students', studentRouter)
app.use('/api/v1/courses', courseRouter)
app.use('/api/v1/teachers', teacherRouter)

export default app
