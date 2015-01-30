var Backbone = require('backbone'),
  $ = require('jquery'),
  test = {},
  // test.test = $,
  DefaultView = require('./views/default');

Backbone.$ = $;

var defaultView = new DefaultView();
$('#test').html(defaultView.$el);