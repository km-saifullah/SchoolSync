const { configDotenv } = require("dotenv")

configDotenv()

const serverPort = process.env.PORT
const dbUrl = process.env.DATABASE_URL

module.exports = { serverPort, dbUrl }