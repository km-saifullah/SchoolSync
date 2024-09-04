const app = require("./app.js")
const connectDb = require("./db/connectDb")
const { serverPort } = require('./config/index')

// connect database
connectDb()

app.listen(serverPort, () => console.log("Server is running"))