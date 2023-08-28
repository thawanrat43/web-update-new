var connection = require('../db');
const jwt = require('jsonwebtoken');
exports.getuser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE id=?";

  connection.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0];
    return res.json(info);
  });
  next();
};
exports.profile = (req, res) => {
  session = req.session;
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token,'secret_token111', (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "SELECT users SET `username`=?,`email`=?,`fname`=?,`lname`=?,`phonenum`=? WHERE session=? ";

    connection.query(
      q,
      [
        req.body.username,
        req.body.email,
        req.body.fname,
        req.body.lname,
        req.body.phonenum,
        userInfo.id,
      ],
      (err, data) => {
        if (err) res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("Updated!");
        return res.status(403).json("You can update only your post!");
      }
    );
  });

};

  