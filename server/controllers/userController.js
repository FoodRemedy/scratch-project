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
      log: 'Express error handler caught unknown middleware error',
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
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: error.message },
    });
  }
};

module.exports = userController;
