const asyncHandler = require('express-async-handler');
const Like = require('../models/like');

// @desc Create a like
// @route POST /api/likes
// @access Private
const createLike = asyncHandler(async (req, res) => {
    const { user, post } = req.body;

    const like = new Like({ user, post });

    await like.save();
    res.status(201).json(like);
});

// @desc Delete like
// @route DELETE /api/likes/:id
// @access Private
const deleteLike = asyncHandler(async (req, res) => {
    const like = await Like.findById(req.params.id);

    if (!like) {
        res.status(404);
        throw new Error('Like not found');
    }

    await like.remove();
    res.status(200).json({message: `Like ${req.params.id} removed`});
});

// @desc Get likes by user
// @route GET /api/likes/user/:userId
// @access Private
const getUserLikes = asyncHandler(async (req, res) => {
    const likes = await Like.find({ user: req.params.userId });

    if (!likes) {
        res.status(404);
        throw new Error('No likes found for this user');
    }

    res.status(200).json(likes);
});

// @desc Get likes by post
// @route GET /api/likes/post/:postId
// @access Private
const getPostLikes = asyncHandler(async (req, res) => {
    const likes = await Like.find({ post: req.params.postId });

    if (!likes) {
        res.status(404);
        throw new Error('No likes found for this post');
    }

    res.status(200).json(likes);
});

module.exports = {
    createLike,
    deleteLike,
    getUserLikes,
    getPostLikes
};
