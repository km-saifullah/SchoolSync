import { configDotenv } from 'dotenv'

configDotenv()

const serverPort = process.env.PORT
const dbUrl = process.env.DATABASE_URL

export { serverPort, dbUrl }
