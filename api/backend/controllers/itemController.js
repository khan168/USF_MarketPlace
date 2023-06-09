const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose');
const Item = require('../models/itemModel')
const Like = require('../models/likesModel');


// @desc Get item
// @route GET /api/items
// @access Private
//find by post id
const getItem = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id)

    if (item) {
        res.status(200).json(item)
    } else {
        res.status(404).json({ message: 'Item not found' })
    }
})

// @desc Get all Items
// @route GET /api/items
// @access Private

const getAllItems = asyncHandler(async (req, res) => {  //this query creates a common end point for several resources
    const q = req.query;
    const filters = {
      ...(q.userId && { userId: q.userId }),
      ...(q.cat && { category: q.cat }),
      ...((q.min || q.max) && {
        price: {
          ...(q.min && { $gt: q.min }),
          ...(q.max && { $lt: q.max }),
        },
      }),
      ...(q.search && { title: { $regex: q.search, $options: "i" } }),
    };
    try {

      if(q.sort==="priceh")  {
        const items = await Item.find(filters).sort({"price":-1})
        res.status(200).send(items);
    }
      else if (q.sort === "pricel") {
        const items = await Item.find(filters).sort({"price":1})
        res.status(200).send(items);
    }
      else if(q.sort==="createdAt") {
        const items = await Item.find(filters).sort({[q.sort]:-1})
        res.status(200).send(items);
    }
      else {
        const items = await Item.find(filters)
        res.status(200).send(items);
      }
    } catch (err) {
      next(err);
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


// @desc Get All Items by Category
// @access Private
const getAllByUser = asyncHandler(async (req, res) => {
    const _id = req.body._id; 
    const items = await Item.find({user: mongoose.Types.ObjectId(_id)})
    if(items){
        res.status(200).json(items)
    } else {
        res.status(400)
        throw new Error('Please add title field')
        
    }
})



// @desc Set item
// @route POST /api/items
// @access Private
const addItem = asyncHandler(async (req, res) => {
    if (!req.body.title || req.body.title.length > 50) {
        res.status(404)
        throw new Error('Title is required and should be less than 50 characters')
    }

    if (req.body.description && req.body.description.length > 1000) {
        res.status(404)
        throw new Error('Description should be less than 1000 characters')
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

    // Find and delete all likes associated with this item
    await Like.deleteMany({ post: req.params.id });
    await item.remove()
    
    console.log({message: `Item ${req.params.id} removed`})
    res.status(200).json({message: `Item ${req.params.id} removed`})
})

module.exports = {
    getItem,
    addItem,
    updateItem,
    deleteItem,
    getAllItems,
    getAllItemsByCategory,
    getAllByUser
}