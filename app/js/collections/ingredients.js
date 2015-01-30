var Backbone = require('backbone'),
  Ingredient = require('../models/ingredient');

module.exports = Backbone.Collection.extend({
  model: Ingredient,
  url: 'api/ingredients'
});