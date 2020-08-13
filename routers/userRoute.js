const router = require('express').Router()
const {login, register, allUser} = require('../controllers/userController')

router.post('/register', register)
router.post('/login', login)
router.get('/all', allUser)

module.exports = router