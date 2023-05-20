const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


// @desc Register user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please enter all fields')
    }

    // check if user exists
    const userExists = await User.findOne({email})
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
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
    const blankToken = jwt.sign({ id: '' }, process.env.JWT_SECRET, {
      expiresIn: '1s',
    });
  
    // Set the new token as the authorization header
    req.headers.authorization = `Bearer ${blankToken}`;
  
    res.json({ message: 'User logged out successfully' });
  });
  

// @desc Get user data
// @route GET /api/users/
// @access Private
const getUser = asyncHandler(async (req, res) => {
    const {_id, name, email} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,
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
    return jwt.sign({ id }, process.env.JWT_SECRET, {
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