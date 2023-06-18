const express = require('express')
const router = express.Router()
const { registerUser, 
    loginUser,
    getUser,
    deleteUser,
    getUserById,
    resetpass,
    updateUser
 }
 = require('../controllers/userController.js')
 
const {protect} = require('../middleware/authMiddleware.js')


router.post('/register', registerUser)
router.post('/login', loginUser)
// router.post('/logout', logoutUser)
router.get('/getUserById/:id', getUserById)
router.post('/resetpass', resetpass)
router.route('/').get(protect, getUser).delete(protect, deleteUser)
router.route("/:id").put(updateUser);    //update  password


module.exports = router