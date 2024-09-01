const jwt = require('jsonwebtoken')
const User = require('../models/User')
const mySecretKey = process.env.JWT_SECRET


const verifyToken = async (req, res, next) => {
    try {
        const { token } = req.cookies
        if (!token) {
            // console.log('Auth error : User not login yet')
            return next()
        }
        const { name , role } = jwt.verify(token,mySecretKey)
        // Double check email
        const user = await User.findOne({name})
        if (!user) {
            // console.log('Auth error : No this email in database')
            return next()
        }
        // Set the user identity
        req.user = {id:user._id, role, name:user.name, profile:user.profile}
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


// - Debug Mode
// const verifyToken = (req, res, next) => {
//     const id = '123'
//     const role = 'user'
//     const name = 'fei'
//     const profile = 'https://as1.ftcdn.net/v2/jpg/03/39/45/96/1000_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg'
//     req.user = {id,role,name,profile}
//     next()
// }

module.exports = {
    verifyToken,
    protect,
    preventLogin
}