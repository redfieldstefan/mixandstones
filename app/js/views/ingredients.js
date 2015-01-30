var Backbone = require('backbone'),
  CocktailsCollection = require('../collections/cocktails'),
  MatchesView = require('./matches-view');

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
    'click button': function () {
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
    }
  },

  render: function () {
    var template = require('./templates/ingredients.hbs');
    this.$el.html(template({collection: this.collection.toJSON()}));
    return this;
  }

});