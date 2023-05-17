const express = require('express')
const router = express.Router()
const { getItem, 
    addItem, 
    updateItem, 
    deleteItem,
} = require('../controllers/itemController.js')

router.route('/').get(getItem).post(addItem)
router.route('/:id').put(updateItem).delete(deleteItem)

module.exports = router