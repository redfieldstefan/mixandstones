var mongoose = require('mongoose'),
  ingredientSchema = mongoose.Schema({
    name: String
  });

module.exports = mongoose.model('Ingredient', ingredientSchema);