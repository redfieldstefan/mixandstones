var Backbone = require('backbone');

module.exports = Backbone.View.extend({
  render: function () {
    var template = require('./templates/matches.hbs');
    this.$el.html(template({collection: this.collection.toJSON()}));
  }
});