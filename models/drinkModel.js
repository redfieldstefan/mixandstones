var mongoose = require('mongoose');

var drinkSchema = mongoose.Schema({
  drinkName: String,
  delicious: Boolean,
  ingredients: Array
});

module.exports = mongoose.model('Drink', drinkSchema);