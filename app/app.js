'use strict';

require('angular/angular');
require('angular/angular-route');

var mixAndStones = angular.module('mixAndStones', [ 'ngRoute' ]);

require('./controllers/adminController')(mixAndStones);

mixAndStones.config([ '$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/admin', {
    controller: adminController,
    view: views/adminView.html
  });
}]);