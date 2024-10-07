import { configDotenv } from 'dotenv'

configDotenv()

const serverPort = process.env.PORT || 8000
const dbUrl = process.env.DATABASE_URL

const jwtSecret = process.env.JWT_SECRET
const jwtExpires = process.env.JWT_EXPIRES

const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY

export { serverPort, dbUrl, jwtSecret, jwtExpires, cloudinaryApiKey }
