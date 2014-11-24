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

      // Render React component with cocktail params
      var html = React.renderToStaticMarkup(cocktailComponent({
        name: dbResponse.name,
        url: dbResponse.url,
        description: dbResponse.description,
        ingredients: dbResponse.ingredients
      }));

      // Return rendered HTML
      return res.status(200).send(html);
    });
  });

};