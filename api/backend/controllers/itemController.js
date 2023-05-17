const asyncHandler = require('express-async-handler')

const Item = require('../models/itemModel')

// @desc Get item
// @route GET /api/items
// @access Private
const getItem = asyncHandler(async (req, res) => {
    const items = await Item.find({})

    res.status(200).json(items)
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
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
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
}