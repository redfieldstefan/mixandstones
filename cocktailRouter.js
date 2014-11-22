'use strict';

var Cocktail = require('./models/cocktailModel');

module.exports = function(app) {

  var apiUrl = '/api/cocktails/';

  /**
   * Create (POST)
   */

  app.post(apiUrl, function(req, res) {
    var cocktail = new Cocktail({
      name: req.body.name,
      ingredients: req.body.ingredients,
      url: req.body.name
        .toLowerCase()
        .replace(/\s/g, '-')
    });
    cocktail.save(function(err, dbResponse) {
      if (err) {
        return res.status(500).json(err);
      } 
      return res.status(200).json(dbResponse);
    });
  });

  /**
   * Read (GET)
   */

  app.get(apiUrl + ':cocktailId', function(req, res) {
    Cocktail.findOne({ _id: req.params.cocktailId }, function(err, dbResponse) {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(dbResponse);
    });
  });

  /**
   * Search (GET)
   */

  app.get('/api/search', function(req, res) {
    Cocktail.find({ ingredients: req.body.ingredients }, function(err, dbResponse) {
      if (err) {
        return err;
      }
      return res.status(200).json(dbResponse);
    });
  });

  /**
   * Update (PUT)
   */

  app.put(apiUrl + ':cocktailId', function(req, res) {
    var updatedDrink = {
      name: req.body.name,
      ingredients: req.body.ingredients,
      url: req.body.name
        .toLowerCase()
        .replace(/\s/g, '-')
    };
    Cocktail.findOneAndUpdate({ _id: req.params.cocktailId }, 
      updatedDrink, 
      function(err, dbResponse) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json(dbResponse);
    });
  });

  /**
   * Delete (DELETE)
   */

  app.delete(apiUrl + ':cocktailId', function(req, res) {
    Cocktail.remove({ _id: req.params.cocktailId }, function(err) {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json({ 'msg': 'Cocktail removed from db' });
    });
  });

};