var Backbone = require('backbone');

module.exports = Backbone.View.extend({

  initialize: function () {
    this.render();
  },

  render: function () {
    var template = require('./templates/default.hbs');
    this.$el.html(template());
    return this;
  }

});