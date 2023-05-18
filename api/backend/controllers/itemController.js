const asyncHandler = require('express-async-handler')

const Item = require('../models/itemModel')

// @desc Get item
// @route GET /api/items
// @access Private
//find by post id
const getItem = asyncHandler(async (req, res) => {
    const items = await Item.findById(req.body.id)

    if (items) {
        res.status(200).json(item)
    } else {
        res.status(404).json({ message: 'Item not found' })
    }
})

// @desc Get all Items
// @route GET /api/items
// @access Private

const getAllItems = asyncHandler(async (req, res) => {
    const items = await Item.find({})

    if(items && items.length !== 0){
        res.status(200).json(items)
    } else {
        res.status(404)
        throw new Error('No items found')
    }
})

// @desc Get All Items by Category
// @route GET /api/items
// @access Private

const getAllItemsByCategory = asyncHandler(async (req, res) => {
    const category = req.body.category; // assuming category is sent in the request body
    const items = await Item.find({ category: category })

    if(items && items.length !== 0){
        res.status(200).json(items)
    } else {
        res.status(404)
        throw new Error(`No items found in category: ${category}`)
    }
})



// @desc Set item
// @route POST /api/items
// @access Private
const addItem = asyncHandler(async (req, res) => {
    if (!req.body.title) {
        res.status(400)
        throw new Error('Please add title field')
    }

    const item = await Item.create({
        user: req.body.user,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        images: req.body.images
    })

    res.status(200).json(item)
})

// @desc Update item
// @route PUT /api/items/:id
// @access Private
const updateItem = asyncHandler(async (req, res) => {

    const item = await Item.findById(req.params.id)

    if (!item) {
        res.status(404)
        throw new Error('Item not found')
    }

    const updatedItem = await Item.findByIdAndUpdate(req.params.id,
         req.body, {new: true})

    res.status(200).json(updatedItem)
});

// @desc Delete item
// @route DELETE /api/items/:id
// @access Private
const deleteItem = asyncHandler(async (req, res) => {

    const item = await Item.findById(req.params.id)

    if (!item) {
        res.status(404)
        throw new Error('Item not found')
    }

    await item.remove

    res.status(200).json({message: `Item ${req.params.id} removed`})
})

module.exports = {
    getItem,
    addItem,
    updateItem,
    deleteItem,
    getAllItems,
    getAllItemsByCategory,
}