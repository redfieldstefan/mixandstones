var mongoose = require('mongoose');

var drinkSchema = mongoose.Schema({
  drinkName: String,
  ingredients: Array
});

module.exports = mongoose.model('Drink', drinkSchema);