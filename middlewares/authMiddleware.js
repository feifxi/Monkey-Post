const jwt = require('jsonwebtoken')
const User = require('../models/User')
const mySecretKey = process.env.JWT_SECRET


const verifyToken = async (req, res, next) => {
    try {
        const { token } = req.cookies
        if (!token) {
            // console.log('Auth : User not login yet')
            return next()
        }
        const { name , role } = jwt.verify(token,mySecretKey)
        // Check if this username is exist
        const user = await User.findOne({name})
        if (!user) {
            // console.log('Auth : No this username in database')
            return next()
        }
        // Set the user identity
        req.user = {
            id: user._id, 
            name: user.name, 
            profile: user.profile,
            role
        }
        next()
    } catch (err) {
        // console.log('Auth error : Token is not valid')
        next()
    }
}

const protect = (req, res,next) => {
    if (!req.user) return res.redirect('/login') 
    next()
}

const preventLogin = (req,res,next) => {
    if (req.user) return res.redirect('/')
    next()
}


module.exports = {
    verifyToken,
    protect,
    preventLogin
}
