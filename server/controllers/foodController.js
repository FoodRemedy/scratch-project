const Illness = require('../models/illnessModels');

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const foodController = {};

// const accessPoint = 'https://api.edamam.com/api/nutrition-data';

// const app_id = 'c3e5b6ff';

// const app_key = 'b23cc3a2748cbdbbc9893ef62a4fffd0';

const preciseURL = 'https://api.edamam.com/api/nutrition-data?app_id=39a9d9d4app_key=089c8440b2425e91bc5ea8bd935b132e&nutrition-type=cooking&ingr=1%20ounce%20';

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

foodController.filterAllergy = async(req, res, next) => {

  console.log('inside of filter allergy')
  const foods = res.locals.foods
  const facts = res.locals.facts
  const user = res.locals.profile

  const goodFood = new Set();
  const goodFacts = new Set();
    if (user.allergy.length > 0){
   
      for (let i = 0; i < facts.length; i++){
        let labels = facts[i].healthLabels;
        user.allergy.forEach((allergy) => {
          console.log('labels', facts[i])
          if (labels.includes(allergy.toUpperCase() + '_FREE')) {
            // console.log(foods[i], allergy)
            goodFood.add(foods[i]);
            goodFacts.add(facts[i]);
          }
        });
      }
      res.locals.foods = goodFood;
      res.locals.facts = goodFacts;
    }
    return next();
};

// foodController.filterDiet = async(req, res, next) => {

//   console.log('inside of filter diet')
//   const foods = res.locals.foods
//   const facts = res.locals.facts
//   // const diet = res.locals.profile.diet
//   const goodFood = new Set();
//   const goodFacts = new Set();

//   if (diet.length > 0){
//     // iterate through facts
//       // facts[]
//       for (let i = 0; i < facts.length; i++){
//         let labels = facts[i].healthLabels;
//         user.diet.forEach((diet) => {
//           if (labels.includes(diet.toUpperCase())) {
//             // console.log(foods[i], diet)
//             goodFood.add(foods[i]);
//             goodFacts.add(facts[i]);
//           }
//         });
//       }
//       res.locals.foods = goodFood;
//       res.locals.facts = goodFacts;
//   }
//     return next();
// };

module.exports = foodController;

// https://api.edamam.com/api/nutrition-data?app_id=c3e5b6ff&app_key=b23cc3a2748cbdbbc9893ef62a4fffd0&nutrition-type=cooking&ingr=1%20ounce%20banana
