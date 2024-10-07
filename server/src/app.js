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
app.use('/api/v1/user', userRoute)
app.use('/api/v1/student', studentRouter)
app.use('/api/v1/course', courseRouter)
app.use('/api/v1/teacher', teacherRouter)

export default app
