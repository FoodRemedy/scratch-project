const express = require('express');
const router = express.Router();

const allergyController = require('../controllers/allergyController');
const blacklistController = require('../controllers/blacklistController');
const dietController = require('../controllers/dietController');
const favoriteController = require('../controllers/favoriteController');

// Route to add allergy preference
router.post('/allergy/:username', allergyController.addAllergy, (req, res) => {
  const { allergy } = res.locals;
  return res.status(200).json(allergy);
});

// Route to add blacklist preference
// router.post(
//   '/blacklist/:username',
//   blacklistController.addBlacklist,
//   (req, res) => {
//     const { blacklist } = res.locals;
//     return res.status(200).json(blacklist);
//   }
// );

// Route to add diet preference
// router.post('/profile/diet/:username', dietController.addDiet, (req, res) => {
//   const { diet } = res.locals;
//   return res.status(200).json(diet);
// });

// Route to add favorite preference
router.post(
  '/favorite/:username',
  favoriteController.addFavorite,
  (req, res) => {
    const { favorite } = res.locals;
    return res.status(200).json(favorite);
  }
);

// Route to remove allergy preference
router.delete(
  '/allergy/:username',
  allergyController.deleteAllergy,
  (req, res) => {
    const { allergy } = res.locals;
    return res.status(200).json(allergy);
  }
);

// Route to remove blacklist preference
// router.delete(
//   '/blacklist/:username',
//   blacklistController.deleteBlacklist,
//   (req, res) => {
//     const { blacklist } = res.locals;
//     return res.status(200).json(blacklist);
//   }
// );

// Route to remove diet preference
// router.delete('/diet/:username', dietController.deleteDiet, (req, res) => {
//   const { diet } = res.locals;
//   return res.status(200).json(diet);
// });

// Route to remove favorite preference
router.delete(
  '/favorite/:username',
  favoriteController.deleteFavorite,
  (req, res) => {
    const { favorite } = res.locals;
    return res.status(200).json(favorite);
  }
);

// Route to get all profile preferences
// router.get(
//   '/all/:username',
//   allergyController.getAllergy,
//   blacklistController.getBlacklist,
//   dietController.getDiet,
//   favoriteController.getFavorite,
//   (req, res) => {
//     const { allergy, blacklist, diet, favorite } = res.locals;
//     const preferences = { allergy, blacklist, diet, favorite };

//     return res.status(200).json(preferences);
//   }
// );

// Route to update all profile preferences
// router.patch(
//   '/all/:username',
//   allergyController.updateAllergy,
//   blacklistController.updateBlacklist,
//   dietController.updateDiet,
//   favoriteController.updateFavorite,
//   (req, res) => {
//     const { allergy, blacklist, diet, favorite } = res.locals;
//     const preferences = { allergy, blacklist, diet, favorite };

//     return res.status(200).json(preferences);
//   }
// );

module.exports = router;
