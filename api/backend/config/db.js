const mongoose = require('mongoose')
const dotenv = require("dotenv")

dotenv.config()

const connectDB = async () => {
    mongoose.set("strictQuery", true);
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.error(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

module.exports = connectDB