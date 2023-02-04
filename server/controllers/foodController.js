const models = require('../models/illnessModels');

const foodController = {};

const accessPoint = 'https://api.edamam.com/api/nutrition-data';

const app_id = 'c3e5b6ff';

const app_key = 'b23cc3a2748cbdbbc9893ef62a4fffd0';

foodController.getFoods = (req, res, next) => {
  // req.body = illness
  // determine

  // returns
  models.Illness.findById(req.body).then((data) => {
    // illness:
    // foods:
    res.locals.foods = data.foods;

    /// returns an array of food objects

    return next();
  });
};

foodController.getFacts = async (req, res, next) => {
  // loop through res.locals.foods
  // call API three times,
  // api_id,
  res.locals.facts = [];
  try {
    for (let food of res.locals.foods) {
      const ingr = '1 ounce ' + food;
      const response = await fetch(accessPoint, {
        headers: {
          app_id: app_id,
          api_key: app_key,
          ingr: ingr,
        },
      });
      const data = await response.json();
      res.locals.facts.push(data);
        }
    }
  } catch {
    // error
    
  }

  // returns array of objects from calling API

  return next();
};

module.exports = foodController;
