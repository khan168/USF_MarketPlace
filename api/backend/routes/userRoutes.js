const express = require('express')
const router = express.Router()
const { registerUser, 
    loginUser,
    logoutUser, 
    getUser,
    deleteUser,
    getUserById }
 = require('../controllers/userController.js')
 
const {protect} = require('../middleware/authMiddleware.js')


router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.post('/getUserById', getUserById)
router.route('/').get(protect, getUser).delete(protect, deleteUser)



module.exports = router