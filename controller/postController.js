const Post = require('../models/Post');
const User = require('../models/User');


const getAllPosts = async (req, res) => {
    try {
        // Check status message
        let success = null, error = null;
        if (req.query.success || req.query.error) {
            success = req.query.success;
            error = req.query.error;
            // console.log('success : ',success,' - erorr :', error)
        }
        // Display profile section
        if (req.query.profile) {
            // console.log(req.query);
            const id = req.query.profile;
            const ownerProfile = await User.findOne({_id:id});
            const posts = await Post.find({author:id}).populate('author', 'name profile _id').sort({ createdAt: -1 });
            res.render('index',{user:req.user, message:{ownerProfile, success, error}, posts});
        } 
        else {
            const posts = await Post.find().populate('author', 'name profile _id').sort({ createdAt: -1 });
            res.render('index',{user:req.user, message:{success, error}, posts});
        } 
    } catch (error) {
        if (error.message.toString().includes('Cast to ObjectId failed')) {
            const statusMessage = encodeURIComponent('Something went wrong...');
            return res.redirect(`/?error=${statusMessage}`);
        }
        res.render('index',{user:req.user, message:{error:'Something went wrong...'}, posts:[]});
        console.log('Get all posts error : ',error.message)
    }
}

const createPost = async (req, res) => {
    try {
        const { id }= req.user;
        const { content, img } = req.body;
        // Create Post
        await Post.create({content:content.trim(), img:img.trim(), author:id});
        // Redirect 
        const statusMessage = encodeURIComponent('Create Post Successfully')
        res.redirect(`/?profile=${id}&success=${statusMessage}`);
    } catch (error) {
        const statusMessage = encodeURIComponent('Something went wrong...')
        res.redirect(`/?profile=${req.user.id}&error=${statusMessage}`);
        console.log('Create post error : ',error.message)
    }
}

const updatePost = async (req, res) => {
    try { 
        const { id } = req.params;
        const { content, img } = req.body;
        // Check if post is exist 
        const editPost = await Post.findById(id) 
        // Check permission
        if (editPost.author._id.toString() !== req.user.id.toString()) {
            const statusMessage = encodeURIComponent('Authentication fail');
            return res.redirect(`/?profile=${id}&error=${statusMessage}`);
        }
        // Update post
        await Post.findByIdAndUpdate(id, {content:content.trim(), img:img.trim()})
        // Redirect 
        const statusMessage = encodeURIComponent('Update Post Successfully');
        res.redirect(`/?profile=${req.user.id}&success=${statusMessage}`);
    } catch (error) {
        const statusMessage = encodeURIComponent('Something went wrong...')
        res.redirect(`/?profile=${req.user.id}&error=${statusMessage}`);
        console.log('Update post error : ', error.message)
    }
}

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        // Check if post is exist 
        const removePost = await Post.findById(id)
        // Check permission
        if (removePost.author._id.toString() !== req.user.id.toString()) {
            const statusMessage = encodeURIComponent('Authentication fail');
            return res.redirect(`/?profile=${id}&error=${statusMessage}`);
        }
        // Delete post
        await Post.findByIdAndDelete(id);
        // Redirect 
        const statusMessage = encodeURIComponent('Delete Post Successfully');
        res.redirect(`/?profile=${req.user.id}&success=${statusMessage}`);
    } catch (error) {
        const statusMessage = encodeURIComponent('Something went wrong...')
        res.redirect(`/?profile=${req.user.id}&error=${statusMessage}`);
        console.log('Delete post error : ', error.message)
    }
}


module.exports = {
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
}