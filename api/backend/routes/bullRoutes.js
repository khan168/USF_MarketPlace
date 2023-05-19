const express = require('express')
const router = express.Router()
const { getItem, 
    addItem, 
    updateItem, 
    deleteItem,
    getAllItems,
    getAllItemsByCategory
} = require('../controllers/itemController.js')

const protect = require("../middleware/authMiddleware")

router.route('/').get(getItem).post(protect, addItem)
router.route('/:id').put(protect, updateItem).delete(protect, deleteItem)
router.route('/getAllItems').get(getAllItems)
router.route('/getAllItemsByCategory').get(getAllItemsByCategory)

module.exports = router