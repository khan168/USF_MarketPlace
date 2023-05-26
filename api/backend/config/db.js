const mongoose = require('mongoose')
require("dotenv").config({ path: "./api/.env" });

const connectDB = async () => {
    mongoose.set("strictQuery", true);
    try {
        const conn = await mongoose.connect(
          process.env.MONGO_URI
        );
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.error(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

module.exports = connectDB
