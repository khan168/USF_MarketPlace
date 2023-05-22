const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


// @desc Register user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password, number, username, profileImage } = req.body

    if (!name || !email || !password || !username || !profileImage || !number)  {
        res.status(400).json({ message: 'Please enter all fields' });
        throw new Error('Please enter all fields')
    }

    // check if user exists
    const userExists = await User.findOne({email})
    if (userExists) {
        res.status(400).json({ message: "User already exists "});
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        username,
        profileImage,
        number,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            number: user.number,
            username: user.username,
            profileImage: user.profileImage,
            token: generateToken(user._id)
        })
    } else {
        res.status(400).json({ message:'Invalid user data'});
        throw new Error('Invalid user data')
    }
})

// @desc Authenticate user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    // check for email
    const user = await User.findOne({ email: email})

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// @desc Logout user
// @route GET /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
    // Replace the JWT with a blank string that expires in 1 second
    const blankToken = jwt.sign({ id: "" }, "abc@123", {
      expiresIn: "1s",
    });
  
    // Set the new token as the authorization header
    req.headers.authorization = `Bearer ${blankToken}`;
  
    res.json({ message: 'User logged out successfully' });
  });
  

// @desc Get user data
// @route GET /api/users/
// @access Private
const getUser = asyncHandler(async (req, res) => {
    const {_id, name, email, profileImage, username} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,
        profileImage,
        username,

    })
})

// @desc Delete user data
// @route DELETE /api/users/
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    await User.findByIdAndRemove(req.user.id)

    .then(() => res.json( {message: 'User deleted successfully'}))
    .catch(err => res.status(400).json('Error: ' + err))

})


// Generate a token
const generateToken = (id) => {
    return jwt.sign({ id }, "abc@123", {
      expiresIn: "30d",
    });
}


module.exports = {
    registerUser,
    loginUser,
    getUser,
    deleteUser,
    logoutUser
}