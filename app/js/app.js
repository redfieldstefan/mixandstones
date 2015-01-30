var Backbone = require('backbone'),
  $ = require('jquery'),
  IngredientsView = require('./views/ingredients'),
  IngredientsCollection = require('./collections/ingredients');

Backbone.$ = $;

var ingredientsView = new IngredientsView({
  collection: new IngredientsCollection()
});
ingredientsView.collection.fetch({
  success: function () {
    ingredientsView.render();
    $('#test').html(ingredientsView.$el);
  }
});