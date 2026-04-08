const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const role = require('../middleware/role')
const { register, login, getProfile, updateProfile, getUsers, deleteUser } = require('../controllers/authController')

router.post('/register', register)
router.post('/login', login)
router.get('/profile', auth, getProfile)
router.put('/profile', auth, updateProfile)
router.get('/users', auth, role('admin'), getUsers)
router.delete('/users/:id', auth, role('admin'), deleteUser)

module.exports = router