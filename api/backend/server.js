const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const connectDB = require('./config/db.js')
const {errorHandler} = require('./middleware/errorMiddleware.js')
const port = process.env.PORT || 5001

// connecting the backend with frontend
const cors =require("cors")



connectDB()

const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors());


// routes
app.use('/api/items', require('./routes/bullRoutes'))
app.use('/api/user', require('./routes/userRoutes'))
app.use("/api/chat", require("./routes/ChatRoutes"));
app.use("/api/message", require("./routes/messageRoutes"));

// custom error handler
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))