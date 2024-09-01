const express = require('express')
const router = express.Router()
const { loginPage, registerPage, registerAuth , loginAuth, logout } = require('../controller/authController')
const { verifyToken, preventLogin } = require('../middlewares/authMiddleware')

router.get('/register', verifyToken, preventLogin, registerPage)

router.get('/login', verifyToken, preventLogin, loginPage)

router.post('/registerAuth', registerAuth)

router.post('/loginAuth', loginAuth)

router.post('/logout', logout)

module.exports = router