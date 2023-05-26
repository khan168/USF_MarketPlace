const express = require('express');
const router = express.Router();
const { createLike, deleteLike, getUserLikes, getPostLikes } = require('../controllers/likesController');

// Route to create a new like
router.post('/', createLike);

// Route to delete a like
router.delete('/:id', deleteLike);

// Route to get likes by a specific user
router.get('/user/:userId', getUserLikes);

// Route to get likes for a specific post
router.get('/post/:postId', getPostLikes);

module.exports = router;
