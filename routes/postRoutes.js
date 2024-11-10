const router = require('express').Router();
const { getAllPosts, getPostsByProfile, createPost, updatePost, deletePost} = require('../controller/postController');
const { verifyToken, protect } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, getAllPosts)

router.get('/profile', verifyToken, getPostsByProfile)

router.post('/createPost', verifyToken, protect, createPost)

router.post('/updatePost/:id', verifyToken, protect, updatePost)

router.post('/deletePost/:id', verifyToken, protect, deletePost)

module.exports = router;