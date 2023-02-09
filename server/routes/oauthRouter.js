const express = require('express');
const router = express.Router();

const oauthController = require('../controllers/oauthController');
const cookieController = require('../controllers/cookieController');

// Redirect to Google login
router.get(
  '/google/redirect',
  oauthController.generateGoogleURL,
  (req, res) => {
    redirect = res.locals.redirect;
    return res.status(200).json({ redirect });
  }
);

// Authenticate Google user
router.get(
  '/google',
  oauthController.getGoogleUser,
  oauthController.authenticateGoogleUser,
  cookieController.setSessionCookie,
  (req, res) => {
    return res.status(302).redirect('http://localhost:8080');
  }
);

module.exports = router;
