var express = require('express')
const {getuser,profile} =require('../controllers/profile')

const router = express.Router();

router.get("/find", getuser);
router.get("/", profile);

module.exports = router;