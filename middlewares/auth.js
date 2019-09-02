const jwt = require('jsonwebtoken');
const config = require('../config');

const checkAuth = (req, res, next) => {
  var token = req.headers['authorization'];
  if (!token) return next();
  token = token.replace('Bearer ', '');

  jwt.verify(token, config.jwtSecret, function(err, user) {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'Session is invalid.'
      });
    } else {
      req.user = user;
      next();
    }
  });
};
module.exports = {
  checkAuth
}
