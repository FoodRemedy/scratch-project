const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const userController = {};

userController.createUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    //check first to see if user is already created
    const found = await User.findOne({ username });
    if (found) {
      console.log('yes user is created');
      throw new Error('username is already in use');
    }
    const newUser = await new User({ username, password });
    await newUser.save();
    res.locals.user = newUser;
    return next();
  } catch (error) {
    return next({
      log: 'Error in userController.createUser middleware function',
      status: 500,
      message: { err: error.message },
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

// jackson added this code
userController.getProfile = async (req, res, next) => {
  const { username } = req.params;
  const { firstName, lastName, allergy, diet } = req.body;
  try {
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

module.exports = userController;
