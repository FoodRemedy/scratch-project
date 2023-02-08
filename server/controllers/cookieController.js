const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const cookieController = {};

// Sets a session cookie with a JWT
cookieController.setSessionCookie = (req, res, next) => {
  const { _id, username } = res.locals.user;

  const token = jwt.sign({_id, username}, secret);
  res.cookie('auth', token, { httpOnly: true });

  return next();
}

cookieController.verifySessionCookie = (req, res, next) => {

}

module.exports = cookieController