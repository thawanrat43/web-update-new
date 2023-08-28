var express = require('express')
const login =require('../controllers/login')
const register =require('../controllers/regisrter')
const logout =require('../controllers/logout')
const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.post("/logout", logout)


module.exports = router;