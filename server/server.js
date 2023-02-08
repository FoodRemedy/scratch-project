// alchemealdb : const mongoURI = 'mongodb+srv://chanduh:alchemeal@solocluster.kybmlap.mongodb.net/?retryWrites=true&w=majority';
// original db : const mongoURI = 'mongodb+srv://goblinshark:codesmith@foodremedy.nl2qzoj.mongodb.net/?retryWrites=true&w=majority';

const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const foodController = require('./controllers/foodController');
const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');

// Enable CORS for all origins, parse JSON payloads, parse cookies
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Deliver static files
app.use(express.static(path.resolve(__dirname, '../client')));

// Route to create new user
app.post(
  '/signup',
  userController.createUser,
  cookieController.setSessionCookie,
  (req, res) => {
    const { username } = res.locals.user;
    return res.status(200).json(username);
  }
);

// Route to log user in
app.post(
  '/login',
  userController.verifyUser,
  cookieController.setSessionCookie,
  (req, res) => {
    const { username } = res.locals.user;
    return res.status(200).json(username);
  }
);

// Route to verify authentication
app.get('/verify', cookieController.verifySessionCookie, (req, res) => {
  const { username } = res.locals.user;
  return res.status(200).json(username);
});

// Route to logout
app.delete('/logout', cookieController.removeSessionCookie, (req, res) => {
  return res.sendStatus(200);
});

// Route to fetch results for selected illness
app.post(
  '/search',
  foodController.getFoods,
  foodController.getFacts,
  (req, res) => {
    return res.status(200).send(res.locals.facts);
  }
);

// Route to add allergy preference
app.post(
  '/profile/allergy/:username',
  allergyController.addAllergy,
  (req, res) => {
    const { allergy } = res.locals;
    return res.status(200).json(allergy);
  }
);

// Route to add blacklist preference
app.post(
  '/profile/blacklist/:username',
  blacklistController.addBlacklist,
  (req, res) => {
    const { blacklist } = res.locals;
    return res.status(200).json(blacklist);
  }
);

// Route to add diet preference
app.post('/profile/diet/:username', dietController.addDiet, (req, res) => {
  const { diet } = res.locals;
  return res.status(200).json(diet);
});

// Route to add favorite preference
app.post(
  '/profile/favorite/:username',
  favoriteController.addFavorite,
  (req, res) => {
    const { favorite } = res.locals;
    return res.status(200).json(favorite);
  }
);

// Route to remove allergy preference
app.delete(
  '/profile/allergy/:username',
  allergyController.deleteAllergy,
  (req, res) => {
    const { allergy } = res.locals;
    return res.status(200).json(allergy);
  }
);

// Route to remove blacklist preference
app.delete(
  '/profile/blacklist/:username',
  blacklistController.deleteBlacklist,
  (req, res) => {
    const { blacklist } = res.locals;
    return res.status(200).json(blacklist);
  }
);

// Route to remove diet preference
app.delete('/profile/diet/:username', dietController.deleteDiet, (req, res) => {
  const { diet } = res.locals;
  return res.status(200).json(diet);
});

// Route to remove favorite preference
app.delete(
  '/profile/favorite/:username',
  favoriteController.deleteFavorite,
  (req, res) => {
    const { favorite } = res.locals;
    return res.status(200).json(favorite);
  }
);

// Route to get all profile preferences
app.get(
  '/profile/:username',
  allergyController.getAllergy,
  blacklistController.getBlacklist,
  dietController.getDiet,
  favoriteController.getFavorite,
  (req, res) => {
    const { allergy, blacklist, diet, favorite } = res.locals;
    const preferences = { allergy, blacklist, diet, favorite };

    return res.status(200).json(preferences);
  }
);

// Route to update all profile preferences
app.patch(
  '/profile/:username',
  allergyController.updateAllergy,
  blacklistController.updateBlacklist,
  dietController.updateDiet,
  favoriteController.updateFavorite,
  (req, res) => {
    const { allergy, blacklist, diet, favorite } = res.locals;
    const preferences = { allergy, blacklist, diet, favorite };

    return res.status(200).json(preferences);
  }
);

// Catch all route
app.use('/', (req, res) => {
  return res.status(404).json({ err: 'Not found.' });
});

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error.',
    status: 500,
    message: { err: 'An unknown error occurred.' },
  };

  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

module.exports = app;
