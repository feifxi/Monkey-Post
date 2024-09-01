const router = require('express').Router()
const { updateUser } = require('../controller/userController')
const { verifyToken, protect } = require('../middlewares/authMiddleware')

router.post('/updateProfile', verifyToken, protect, updateUser)

module.exports = router