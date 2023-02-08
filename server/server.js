// alchemealdb : const mongoURI = 'mongodb+srv://chanduh:alchemeal@solocluster.kybmlap.mongodb.net/?retryWrites=true&w=majority';
// original db : const mongoURI = 'mongodb+srv://goblinshark:codesmith@foodremedy.nl2qzoj.mongodb.net/?retryWrites=true&w=majority';

const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const foodController = require('./controllers/foodController');
const userController = require('./controllers/userController');

// needed to fix fetching problem in react
app.use(cors());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../client')));

// handles POST requests from illness dropdown
app.post(
  '/search',
  foodController.getFoods,
  foodController.getFacts,
  (req, res) => res.status(200).send(res.locals.facts),
);

// route for signing up
app.get('/signup', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/signup.html'));
});

app.post('/signup', userController.createUser, (req, res) => {
  res.status(200).json(res.locals.user);
});

app.post('/login', userController.verifyUser, (req, res) => {
  res.status(200).json(res.locals.username);
});

//save favorite food to user's favorite folder
app.patch('/user/addfav/:username', userController.addFavorite, (req, res) => {
  res.status(200).json(res.locals.favorite);
});
//get a collection of favorite food for a user
app.get('/user/:username', userController.getFavorite, (req, res) => {
  res.status(200).json(res.locals.favorite);
});

//delete a favorite food from a user's favorite collection
app.patch(
  '/user/deletefav/:username',
  userController.deleteFavorite,
  (req, res) => {
    res.status(200).json(res.locals.favorite);
  }
);

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

module.exports = app;
