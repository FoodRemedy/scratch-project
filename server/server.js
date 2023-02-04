const path = require('path');

const mongoose = require('mongoose');

const express = require('express');

const app = express();

const cors = require('cors');

const PORT = 3000;

const foodController = require('./controllers/foodController');

const userController = require('./controllers/userController');

//connect to database
const mongoURI =
  'mongodb+srv://goblinshark:codesmith@foodremedy.nl2qzoj.mongodb.net/?retryWrites=true&w=majority';
mongoose
  .connect(mongoURI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

// needed to fix fetching problem in react
app.use(cors());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../client')));

// handles POST requests from illness dropdown
app.post(
  '/search',
  foodController.getFoods,
  foodController.getFacts,
  (req, res) => res.status(200).send(res.locals.facts)
);

//route for signing up
app.get('/signup', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/signup.html'));
});

app.post('/signup', userController.createUser, (req, res) => {
  res.status(200).json(res.locals.user);
});

app.post('/login', userController.verifyUser, (req, res) => {
  res.status(200).json(res.locals.username);
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// listens, confirms connection
app.listen(PORT, () => {
  console.log(`Success! Your application is running on port ${PORT}.`);
});
