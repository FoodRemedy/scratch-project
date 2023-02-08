const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const cookieController = {};

// Sets a session cookie with a JWT
cookieController.setSessionCookie = (req, res, next) => {
  const { _id, username } = res.locals.user;

  const sessionToken = jwt.sign({_id, username}, secret);
  res.cookie('sessionToken', sessionToken, { httpOnly: true });

  return next();
};

// Verify JWT from session cookie
cookieController.verifySessionCookie = async (req, res, next) => {
  // Check if session token exists
  if (!req.cookies.hasOwn(sessionToken)) {
    return next({
      log: `ERROR - cookieController.verifySessionCookie: Failed to extract cookie.`,
      status: 400,
      message: { err: 'User is not authenticated.' },
    });
  }

  // Decode token
  const { sessionToken } = req.cookies;

  try {
    const { _id, username } = jwt.verify(sessionToken, process.env.JWT_SECRET);

    // Check decoded payload against db
    const userMatch = await User.findOne({ _id, username });
    if (userMatch === null) {
      return next({
        log: `ERROR - cookieController.verifySessionCookie: Failed to match payload.`,
        status: 400,
        message: { err: 'User is not authenticated.' },
      });
    }

    return next();
  } 
  catch (err) {
    return next({
      log: `ERROR - cookieController.verifySessionCookie, failed to decode token or match payload: ${err}`,
      status: 400,
      message: { err: 'User is not authenticated.' },
    });
  }
};

cookieController.removeSessionCookie = (req, res, next) => {

};

module.exports = cookieController