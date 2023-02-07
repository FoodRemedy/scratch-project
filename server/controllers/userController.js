const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userController = {};

// Writes a new a user to the database
userController.createUser = async (req, res, next) => {
  const { username, password } = req.body;

  // Username type validation - must be type String between 6 and 30 characters inclusive
  if (typeof username !== 'string' || username.length < 6 || username.length > 30) {
    return next({
      log: 'ERROR - userController.createUser: request body contains invalid username.',
      status: 400,
      message: { err: 'Username must be between 6 and 30 characters in length.' },
    });
  }

  // Password type validation
  if (typeof password !== 'string' || password.length < 8) {
    return next({
      log: 'ERROR - userController.createUser: request body contains invalid password.',
      status: 400,
      message: { err: 'Password must have a minimum of 8 characters.' },
    });
  }

  try {
    // Check if username already exists
    const usernameMatch = await User.findOne({ username });
    if (usernameMatch !== null) {
      return next({
        log: 'ERROR - userController.createUser: request body contains username that is already in use.',
        status: 400,
        message: { err: 'Username is already in use.' },
      });
    }

    // Create hashed password
    const hashedPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);

    // Write new user to database
    const user = await User.create({ username, hashedPassword });
    res.locals.user = user;
    
    return next();
  } 
  catch (err) {
    return next({
      log: `ERROR - userController.createUser: ${err}`,
      status: 400,
      message: { err: 'Failed to create user. Check server log for details.' },
    });
  }
};

userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    //grab encrypted password from db
    const user = await User.find({ username });
    console.log(user);
    if (!user[0]) {
      console.log('no user found');
      throw new Error('no user found');
    }
    const matched = await bcrypt.compare(password, user[0].password);
    if (!matched) {
      throw new Error('password incorrect');
    }
    res.locals.username = username;
    return next();
  } catch (error) {
    return next({
      log: 'Error in userController.verifyUser middleware function',
      status: 500,
      message: { err: error.message },
    });
  }
};

userController.addFavorite = async (req, res, next) => {
  const username = req.params.username;
  try {
    const user = await User.findOne({ username });
    const favorite = user?.favorite;
    if (!user) {
      throw Error('user not found');
    }
    //const favorite = user.favorite;
    //findoneandupdate {username}, {favorite:[...favorite,food]}
    const addFavorite = await User.findOneAndUpdate(
      { username },
      { favorite: [...favorite, req.body] }
    );
    if (!addFavorite) {
      throw Error('user cannot be updated');
    }
    res.locals.favorite = addFavorite;
    return next();
  } catch (error) {
    return next({
      log: 'Error in userController.addFavorite middleware function',
      status: 500,
      message: { err: error.message },
    });
  }
  //findOne => return the user
};

userController.getFavorite = async (req, res, next) => {
  const username = req.params.username;
  try {
    const user = await User.findOne({ username });
    res.locals.favorite = user.favorite;
    next();
  } catch (error) {
    return next({
      log: 'Error in userController.getFavorites middleware function',
      status: 500,
      message: { err: error.message },
    });
  }
};

userController.deleteFavorite = async (req, res, next) => {
  const username = req.params.username;
  const { food } = req.body;
  try {
    const user = await User.findOne({ username });
    const favorite = user?.favorite;
    if (!user) {
      throw Error('user not found');
    }
    //const favorite = user.favorite;
    //findoneandupdate {username}, {favorite:[...favorite,food]}
    const deleteFavorite = await User.findOneAndUpdate(
      { username },
      { favorite: favorite.filter((obj) => obj.food !== food) }
    );
    if (!deleteFavorite) {
      throw Error('user cannot be updated');
    }
    res.locals.favorite = deleteFavorite;
    return next();
  } catch (error) {
    return next({
      log: 'Error in userController.addFavorite middleware function',
      status: 500,
      message: { err: error.message },
    });
  }
  //findOne => return the user
};

module.exports = userController;
