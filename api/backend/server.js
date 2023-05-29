const express = require('express')
const dotenv = require('dotenv').config({ path: "./api/.env" });
const colors = require('colors')
const jwt = require("jsonwebtoken");
const passport = require("passport");
const connectDB = require('./config/db.js')
const session = require("express-session");
const {errorHandler} = require('./middleware/errorMiddleware.js')
const port = process.env.PORT

// connecting the backend with frontend
const cors =require("cors")

// Passport config
require('./middleware/passport')(passport)


connectDB()

const app = express()

// Express session
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    })
);

// middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/items', require('./routes/bullRoutes'))
app.use('/api/user', require('./routes/userRoutes'))
app.use("/api/chat", require("./routes/ChatRoutes"));
app.use("/api/message", require("./routes/messageRoutes"));
app.use('/api/likes',  require('./routes/likesRoutes'));
app.use("/api/verify",async (req,res)=>{
    const {token,secret} = req.body
    try {
            const decoded = jwt.verify(token, secret);
            if(decoded) return res.send({result:"true"})
        } catch (error) {
            res.send({result:"false"})
        }
})

// custom error handler
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))