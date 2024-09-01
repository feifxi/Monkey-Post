const router = require('express').Router();
const { getAllPosts, createPost, updatePost, deletePost,} = require('../controller/postController');
const { verifyToken, protect } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, getAllPosts)

router.post('/createPost', verifyToken, protect, createPost)

router.post('/updatePost/:id', verifyToken, protect, updatePost)

router.post('/deletePost/:id', verifyToken, protect, deletePost)

module.exports = router;