const Post = require('../models/Post');
const User = require('../models/User');


const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'name profile _id').sort({ createdAt: -1 });
        res.render('index',{
            posts,
            user: req.user, 
            success: req.flash('success')[0],
            error: req.flash('error')[0]
        });
    } catch (error) {
        res.render('index',{
            posts:[],
            user: req.user,
            success: null,
            error: 'Something went wrong...'
        });
        console.log('Get all posts error : ',error.message)
    }
}

const getPostsByProfile = async (req, res) => {
    const { id } = req.query;
    try {
        const userProfile = await User.findById(id);
        const posts = await Post.find({author: id}).populate('author', 'name profile _id').sort({ createdAt: -1 });
        res.render('profile',{
            posts,
            user: req.user, 
            userProfile,
            success: req.flash('success')[0],
            error: req.flash('error')[0]
        });
    } catch (error) {
        if (error.message.toString().includes('Cast to ObjectId failed')) {
            req.flash('error','There is no user profile');
            return res.redirect('/');
        }
        req.flash('error','Something went wrong...');
        res.redirect('/');
        console.log('Get posts profile error : ',error.message)
    }
}

const createPost = async (req, res) => {
    const { id } = req.user;
    const { content, img } = req.body;
    try {
        // Create Post
        await Post.create({
            content:content.trim(), 
            img:img.trim(), 
            author:id
        });
        // Redirect 
        req.flash('success','Create Post Successfully');
        res.redirect(`/profile?id=${id}`);
    } catch (error) {
        req.flash('error','Something went wrong...');
        res.redirect(`/profile?id=${id}`);
        console.log('Create post error : ',error.message)
    }
}

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { content, img } = req.body;
    try { 
        // Check if post is exist 
        const editPost = await Post.findById(id) 
        // Check permission
        if (editPost.author._id.toString() !== req.user.id.toString()) {
            req.flash('error','Authentication fail');
            return res.redirect(`/profile?id=${req.user.id}`);
        }
        // Update Post
        await Post.findByIdAndUpdate(id, {
            content:content.trim(), 
            img:img.trim()
        })
        // Redirect 
        req.flash('success','Update Post Successfully');
        res.redirect(`/profile?id=${req.user.id}`);
    } catch (error) {
        req.flash('error','Something went wrong...');
        res.redirect(`/profile?id=${req.user.id}`);
        console.log('Update post error : ', error.message)
    } 
}

const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        // Check if post is exist 
        const removePost = await Post.findById(id)
        // Check permission
        if (removePost.author._id.toString() !== req.user.id.toString()) {
            req.flash('error','Authentication fail');
            return res.redirect(`/profile?id=${req.user.id}`);
        }
        // Delete Post
        await Post.findByIdAndDelete(id);
        // Redirect 
        req.flash('success','Delete Post Successfully');
        res.redirect(`/profile?id=${req.user.id}`);
    } catch (error) {
        req.flash('error','Something went wrong...');
        res.redirect(`/profile?id=${req.user.id}`);
        console.log('Delete post error : ', error.message)
    }
}


module.exports = {
    getAllPosts,
    getPostsByProfile,
    createPost,
    updatePost,
    deletePost,
}