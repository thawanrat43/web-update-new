const jwt = require('jsonwebtoken');
exports.Cookiecheck = (req,res,next) => {
    const token = req.cookies.access_token;
    if(!token){
        return res.status(401).json('No token found');
    }

    jwt.verify(token, secret, (err, user) => {
        if(err){
        return res.status(403).json('Invalid Token');
        }
        req.user = {
        id: user.id
        }
        next();
    })
};
