var Backbone = require('backbone'),
  CocktailModel = require('../models/cocktail'),
  CocktailsCollection = require('../collections/cocktails'),
  MatchesView = require('./matches-view'),
  _ = require('lodash');

module.exports = Backbone.View.extend({

  _ingredients: [],

  events: {
    'click li': function (event) {
      var ingredient = this.$(event.target).data("ingredient-target");
      if (this._ingredients.indexOf(ingredient) === -1) {
        this._ingredients.push(ingredient);
      }
      console.log(this._ingredients);
    },

    'click #get-recommendation': function () {
      var cocktailsCollection = new CocktailsCollection({
        ingredients: this._ingredients
      });
      cocktailsCollection.fetch({
        success: function () {
          var matchesView = new MatchesView({
            collection: cocktailsCollection
          });
          matchesView.render();
          Backbone.$('#matches').html(matchesView.$el);
          console.log(cocktailsCollection);
        }
      });
    },

    'click #create-cocktail': function () {
      var name = this.$("input#name").val(),
        description = this.$("input#description").val(),
        ingredients = this.$("input#ingredients").val().split(",");

      var newCocktail = new CocktailModel({
        name: name,
        description: description,
        ingredients: ingredients
      });
      newCocktail.save({}, {
        success: _.bind(function () {
          this.collection.fetch({
            success: _.bind(function () {
              this.render();
            }, this)
          });
        }, this)
      });
    }
  },

  render: function () {
    var template = require('./templates/ingredients.hbs');
    this.$el.html(template({collection: this.collection.toJSON()}));
    return this;
  }

});