'use strict';

require('node-jsx').install({ 
  extension: '.jsx' 
});

var Cocktail = require('../models/cocktailModel'),
  React = require('react'),
  cocktailComponent = React.createFactory(require('../components/cocktail.jsx'));

module.exports = function(app) {
  
  /**
   * Renders a cocktail page using React (server side!)
   */

  app.get('/cocktails/:cocktail', function(req, res) {
    Cocktail.findOne({ 
      url: req.params.cocktail 
    }, function(err, dbResponse) {
      if (err) {
        return res.status(500).json(err);
      }

      var html = React.renderToStaticMarkup(cocktailComponent({
        name: dbResponse.name,
        url: dbResponse.url,
        description: dbResponse.description,
        ingredients: dbResponse.ingredients
      }));

      return res.status(200).send(html);
    });
  });

};