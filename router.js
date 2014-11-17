'use strict';

var Drink = require('./models/drinkModel');

module.exports = function(app) {
  app.get('/api', function(req, res) {
    res.send('Hello, world');
  });

  app.get('/api/drinks/:drinkName', function(req, res) {
    Drink.findOne({ drinkName: req.params.drinkName }, function(err, dbResponse) {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(dbResponse.ingredients);
    });
  });

  app.post('/api/drinks/:drinkName/:ingredients', function(req, res) {
    var ingredients = req.params.ingredients.split(',');
    var drink = new Drink({ 
      drinkName: req.params.drinkName,
      ingredients: ingredients
    });
    console.log(drink);
    drink.save(function(err, dbResponse) {
      if (err) {
        return res.status(500).json(err);
      } 
      return res.status(200).json(dbResponse);
    });
  });
};