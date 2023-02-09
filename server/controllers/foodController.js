const Illness = require('../models/illnessModels');
const ENV = require('dotenv').config().parsed;

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const foodController = {};

const preciseURL = process.env.PRECISE_URL;

foodController.getFoods = (req, res, next) => {
  // queries mongoDB for illness, saves related foods in res locals
  console.log('hitting get foods');
  try {
    Illness.findOne({ ailment: req.body.ailment }).then((data) => {
      res.locals.foods = data.foods;
      console.log('this is data', res.locals.foods);
      return next();
    });
  } catch (error) {
    return next({
      log: 'Express error handler caught in getFoods handler',
      status: 500,
      message: error.message,
    });
  }
};

foodController.getFacts = async (req, res, next) => {
  console.log('inside of getFacts in food controller');
  try {
    const facts = await Promise.all(
      res.locals.foods.map(async (food) => {
        const newURL = preciseURL + food;
        const response = await fetch(newURL);
        return response.json();
      })
    );
    res.locals.facts = facts;
    // console.log(facts)
    // console.log('length', res.locals.facts.length);
    return next();
  } catch (error) {
    console.log(error);
    return next({
      log: 'Express error handler caught getFacts handler',
      status: 500,
      message: error,
    });
  }
};

module.exports = foodController;
