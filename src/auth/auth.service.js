const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { TOKEN_EXPIRY } = require('../utils/AppConstants');

const generateAccessToken = (user) => jwt.sign(user.toJSON(), config.tokenSecret, { expiresIn: TOKEN_EXPIRY });

const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access Denied');
  try {
    const verified = jwt.verify(token, config.tokenSecret);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send(`Error verifying token: ${error}`);
  }
};

const getRouteValidators = (...validators) => {
  return [authenticate, ...validators];
};

module.exports = {
  generateAccessToken,
  authenticate,
  getRouteValidators,
};
