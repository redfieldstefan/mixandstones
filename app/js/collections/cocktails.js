var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({
  url: function () {
    var ingredients = JSON.stringify(this.models[0].attributes.ingredients);
    return "api/search/" + ingredients;
  }
});