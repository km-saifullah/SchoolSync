import express from 'express'
import cors from 'cors'
import userRoute from './routes/userRoute.js'
import studentRouter from './routes/studentRoutes.js'

const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: '*' }))

// routes
app.use('/api/v1/user', userRoute)
app.use('/api/v1/student', studentRouter)

export default app
