const User = require('../models/User');
const Post = require('../models/Post');

const updateUser = async (req, res) => {
    try { 
        const { id }= req.user;
        const { profile } = req.body
        // Validate data 
        if (profile === '') {
            const statusMessage = encodeURIComponent('Please fill the input');
            return res.redirect(`/?profile=${id}&error=${statusMessage}`);
        }
        // Check user exist
        const editUser = await User.findById(id)
        // Update Profile
        await User.findByIdAndUpdate(id, { profile:profile.trim() })
        
        // Redirect 
        const statusMessage = encodeURIComponent('Update profile Successfully')
        res.redirect(`/?profile=${id}&success=${statusMessage}`);
    } catch (error) {
        const statusMessage = encodeURIComponent('Something went wrong...')
        res.redirect(`/?profile=${req.uesr.id}&error=${statusMessage}`);
        console.log('Update user error : ', error.message)
    }
}


module.exports = {
    updateUser
}