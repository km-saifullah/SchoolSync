import { configDotenv } from 'dotenv'

configDotenv()

const serverPort = process.env.PORT || 8000
const dbUrl = process.env.DATABASE_URL

const jwtSecret = process.env.JWT_SECRET
const jwtExpires = process.env.JWT_EXPIRES

export { serverPort, dbUrl, jwtSecret, jwtExpires }
