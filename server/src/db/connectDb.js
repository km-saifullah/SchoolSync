const mongoose = require("mongoose")
const { dbUrl } = require('./../config/index')

const connectDb = async () => {
  try {
    await mongoose.connect(dbUrl)
    console.log("Database Connected")
  } catch (error) {
    console.log(error.message)
  }
}
module.exports = connectDb