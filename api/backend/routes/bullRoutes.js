const express = require('express')
const router = express.Router()
const { getItem, 
    addItem, 
    updateItem, 
    deleteItem,
    getAllItems,
    getAllItemsByCategory,
    getAllByUser
} = require('../controllers/itemController.js')

const {protect} = require("../middleware/authMiddleware")

router.route("/getAllItems").get(getAllItems);
router.route('/:id').get(getItem)
router.post("/",protect, addItem)
router.route('/:id').put(protect, updateItem).delete(protect, deleteItem)
router.route('/getAllItemsByCategory').get(getAllItemsByCategory)
router.route('/getAllByUser').post(getAllByUser)

module.exports = router