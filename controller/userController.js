const User = require('../models/User');

const updateUser = async (req, res) => {
    const { id } = req.user;
    const { profile } = req.body
    try { 
        // Validate data 
        if (profile === '') {
            req.flash('error','Please fill the input')
            return res.redirect(`/profile?id=${id}`);
        }
        // Update Profile
        await User.findByIdAndUpdate(id, {
            profile: profile.trim() 
        })
        req.flash('success','Update profile Successfully')
        res.redirect(`/profile?id=${id}`);
    } catch (error) {
        req.flash('error','Something went wrong...')
        res.redirect(`/profile?id=${id}`);
        console.log('Update user error : ', error.message)
    }
}


module.exports = {
    updateUser
}