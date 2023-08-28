var express = require('express')
const Cookiecheck = require('../middleware/Cookiecheck')

const router = express.Router();


// router.get('/test', (req, res) => {
//     res.send('it work')
// })
// module.exports = router;

// router.get('/test', Cookiecheck, (req, res) => {
//     console.log(req.user);
//     res.json("You got the private route");
// })

module.exports = router;