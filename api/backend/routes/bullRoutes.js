const express = require('express')
const router = express.Router()
const { getItem, 
    addItem, 
    updateItem, 
    deleteItem,
    getAllItems,
    getAllItemsByCategory
} = require('../controllers/itemController.js')

router.route('/').get(getItem).post(addItem)
router.route('/:id').put(updateItem).delete(deleteItem)
router.route('/getAllItems').get(getAllItems)
router.route('/getAllItemsByCategory').get(getAllItemsByCategory)

module.exports = router