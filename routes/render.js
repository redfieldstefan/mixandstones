'use strict';

require('node-jsx').install({ 
  extension: '.jsx' 
});

var Cocktail = require('../models/cocktailModel');

module.exports = function(app) {
  
  /**
   * Renders the index page using Handlebars
   */

  app.get('/', function(req, res) {
    res.render('index');
  });

  /**
   * Renders the start page
   */

  app.get('/home', function(req, res) {
    res.render('home');
  });

  /**
   * Renders an individual cocktail page
   *
   * @param {String} req.params.cocktail    The URL-formatted cocktail name
   * @returns                               The rendered HTML
   */

  // Find matching cocktail
  app.get('/cocktails/:cocktail', function(req, res) {
    Cocktail.findOne({ 
      url: req.params.cocktail 
    }, function(err, dbResponse) {
      if (err) {
        return res.status(500).json(err);
      }

      // Pass rendered component & other params into Handlebars
      res.render('cocktail', {
        name: dbResponse.name,
        description: dbResponse.description,
        ingredients: dbResponse.ingredients
      });

    });
  });

};