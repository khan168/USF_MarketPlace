const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");
require("dotenv").config({ path: "../api/.env" });



// @desc reset user password
// @route Update /api/users/:id
// @access Public
const resetpass = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.send("User not registered");
  } else {
    const secret = process.env.JWT_SECRET + user.password; //password part in secret makes sure user link is 1 time as the secret key in token changes as pass changes so same token cant be verified with same link
    const payload = {
      email,
      id: user._id,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "15m" });
    const link = `https://bullsmarketplace.netlify.app/forgot-password/${user._id}/${token}`;


    console.log(process.env.PASS);
    console.log(process.env.USER);

    let config = {
      service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    };

    let transporter = nodemailer.createTransport(config);

    

    let mailOptions = {
      from: process.env.USER,
      to: email,
      subject: "USF Market Place",
      text: link,
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
      }
    });

    return res.send(`Link sent to email ${email}`);
  }
});

// @desc Register user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, number, username, profileImage } = req.body;

  if (!name || !email || !password || !username || !number) {
    res.status(400).json({ message: "Please enter all fields" });
    throw new Error("Please enter all fields");
  }

  // check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: "User already exists " });
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    username,
    profileImage,
    number,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      number: user.number,
      username: user.username,
      profileImage: user.profileImage,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
    throw new Error("Invalid user data");
  }
});

// @desc Authenticate user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check for email
  const user = await User.findOne({ email: email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});



// @desc Get user data
// @route GET /api/users/
// @access Private
const getUser = asyncHandler(async (req, res) => {
  const { _id, name, email, profileImage, username, number } =
    await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name,
    email,
    profileImage,
    username,
    number,
  });
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    user,
  });
});

// @desc Delete user data
// @route DELETE /api/users/
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  await User.findByIdAndRemove(req.user.id)

    .then(() => res.json({ message: "User deleted successfully" }))
    .catch((err) => res.status(400).json("Error: " + err));
});

// @desc Update user password
// @route PUT /api/users/:id
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const id = req.params.id;
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  await User.findByIdAndUpdate(id, { password: hashedPassword })
    .then(() => res.json({ message: "password updates successfully" }))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Generate a token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  deleteUser,
  getUserById,
  resetpass,
  updateUser,
};
