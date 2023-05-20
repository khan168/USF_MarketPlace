const mongoose = require('mongoose')
const dotenv = require("dotenv")

dotenv.config()

const connectDB = async () => {
    mongoose.set("strictQuery", true);
    try {
        const conn = await mongoose.connect(
          "mongodb+srv://nathannoelallen:T8pDA3tSb3ookFZz@bullscluster.kh6xutx.mongodb.net/bullsapp"
        );
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.error(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

module.exports = connectDB