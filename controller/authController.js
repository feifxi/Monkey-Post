const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mySecretKey = process.env.JWT_SECRET

const registerPage = (req, res) => {
    res.render('register',{user:req.user, message:{}, data:null})
}

const loginPage = (req, res) => {
    res.render('login', {user:req.user, message:{}, data:null}) 
}

const registerAuth = async (req, res) => {
    const { name, password } = req.body; 
    const data = {name, password}
    try {
        const profile = 'https://as1.ftcdn.net/v2/jpg/03/39/45/96/1000_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg';
        await User.create({name, password, profile});
        res.render('register',{user:req.user, message:{success:'Registered successfully'}, data:null});
    } catch (error) { 
        let errorMsg = null;
        if (error.code === 11000){
            if (error.keyPattern.name) errorMsg = 'This username already associated with an account'
        }
        else {
            errorMsg = 'Somthing went wrong..'
        }
        res.render('register', {user:req.user, message:{error:errorMsg}, data}) 
        console.log('Register error : ', error.message)            
    } 
}

const loginAuth = async (req, res) => {
    try {
        const { name, password } = req.body
        const data = {name, password}
        // Name validate
        const user = await User.findOne({name})
        if (!user) return res.render('login', {user:req.user, message:{error:'No user found with this username'}, data})
        // Password validate    
        const matchPw = await bcrypt.compare(password, user.password)
        if (!matchPw) return res.render('login', {user:req.user, message:{error:'Invalid password'}, data}) 
        // JWT
        const token = jwt.sign(
            {name,role:'user'},
            mySecretKey,
            {expiresIn:'30m'} 
        )
        // Cookie
        res.cookie('token',token,{
            maxAge: 1000 * 60 * 30,
            secure: true,
            httpOnly: true, 
            sameSite: "none"
        })
        res.redirect('/')   
    } catch (error) {
        res.render('login', {user:req.user, message:{error:'Somthing went wrong..'}})
        console.log('Login error : ', error.message)
    }
}

const logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/')
}


module.exports = {
    registerPage,
    loginPage,
    registerAuth,
    loginAuth,
    logout
}