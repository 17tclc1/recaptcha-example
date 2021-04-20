const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRE } = require('../env/env');
const signToken = (object) => {
  return jwt.sign(object, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
    noTimestamp: true,
  })
}
const decodeToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
}
module.exports = {
  signToken,
  decodeToken,
}