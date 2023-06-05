const express = require('express')
const dotenv = require('dotenv').config({ path: "../.env" });
const colors = require('colors')
const jwt = require("jsonwebtoken");
const connectDB = require('./config/db.js')
const {errorHandler} = require('./middleware/errorMiddleware.js')
const port = process.env.PORT

// connecting the backend with frontend
const cors =require("cors")


const https = require('https');
const fs = require('fs');

connectDB()

const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors());


// routes
app.use('/api/items', require('./routes/bullRoutes'))
app.use('/api/user', require('./routes/userRoutes'))
app.use("/api/chat", require("./routes/chatRoutes"));
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

//For Production

const httpsServer = https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/bullsmarketplace.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/bullsmarketplace.com/fullchain.pem'),
  }, app);


httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});
