const Illness = require('../models/illnessModels');

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const foodController = {};

// const accessPoint = 'https://api.edamam.com/api/nutrition-data';

// const app_id = 'c3e5b6ff';

// const app_key = 'b23cc3a2748cbdbbc9893ef62a4fffd0';

const preciseURL = 'https://api.edamam.com/api/nutrition-data?app_id=c3e5b6ff&app_key=b23cc3a2748cbdbbc9893ef62a4fffd0&nutrition-type=cooking&ingr=1%20ounce%20';

// gets
foodController.getFoods = (req, res, next) => {
  // queries mongoDB for illness, saves related foods in res locals
  console.log('hitting get foods');
  try {
    Illness.findOne({ ailment: req.body.ailment }).then((data) => {
      res.locals.foods = data.foods;
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
      }),
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

foodController.filterFoods = async(req, res, next) => {
  const foods = res.locals.foods
  const facts = res.locals.facts
//hard coding user for testing:
const profile = {
  "allergy": [
      "gluten",
      "lupine",
      "soy"
  ],
  "diet": [
      "vegan"
  ],
}
//   const { foods, facts } = res.lcoals; // will also include user profile
  const goodFood = [];
  const goodFacts = [];
  const badFood = {};
    for (let i = 0; i < facts.length; i++){
      let labels = facts[i].healthLabels;
      profile.allergy.forEach((allergy) => {
        console.log(allergy.toUpperCase + '_FREE')
        if (labels[i] !== allergy.toUpperCase() + '_FREE') badFood[foods[i]] = allergy;
        else {
          goodFood.push(foods[i]);
          goodFacts.push(facts[i]);
        };
      });
      res.locals.food = goodFood;
      res.locals.facts = goodFacts;
      res.locals.filteredFood = badFood;
      // console.log('good foods: ', badFood)
    }
    return next();
};

// router.post(
//   '/search/:username',
//   userController.getProfile,
//   foodController.getFoods,
//   foodController.getFacts,
//   foodController.filterFoods,
//   (req, res) => {
//     return res.status(200).send(res.locals.facts);
//   }
// );


module.exports = foodController;

// https://api.edamam.com/api/nutrition-data?app_id=c3e5b6ff&app_key=b23cc3a2748cbdbbc9893ef62a4fffd0&nutrition-type=cooking&ingr=1%20ounce%20banana
