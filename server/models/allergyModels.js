const mongoose = require('mongoose');

const allergySchema = new mongoose.Schema({
  allergy: {
    type: String,
    required: true,
  },
  foods: [
    {
      type: String,
    },
  ],
});

const Allergy = mongoose.model('Allergy', allergySchema);

module.exports = Allergy;
