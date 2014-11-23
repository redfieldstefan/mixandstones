'use strict';

var Cocktail = require('./models/cocktailModel');

module.exports = function(app) {

  var apiUrl = '/api/cocktails/';

  /**
   * Saves a new cocktail in the database
   *
   * @param {Object} req.body   The new cocktail
   * @returns {Object}          The cocktail as saved in the db
   */

  app.post(apiUrl, function(req, res) {
    var cocktail = new Cocktail({
      name: req.body.name,
      ingredients: req.body.ingredients.sort(),
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
   * Returns a single cocktail from the db
   *
   * @param {String} req.params.cocktail    The URL-formatted cocktail name
   * @returns {Object}                      The matching cocktail
   */

  app.get(apiUrl + ':cocktail', function(req, res) {
    Cocktail.findOne({ url: req.params.cocktail }, 
      function(err, dbResponse) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json(dbResponse);
      });
  });

  /**
   * Returns an array of cocktails whose ingredients match those
   * the user has available
   *
   * @param {Array} req.body.ingredients    The available ingredients
   * @returns {Array}                       All matching cocktails
   */

  app.get('/api/search', function(req, res) {
    Cocktail.find({ ingredients: req.body.ingredients.sort() }, 
      function(err, dbResponse) {
        if (err) {
          return err;
        }
        return res.status(200).json(dbResponse);
      });
  });

  /**
   * Updates a single cocktail
   *
   * @param {ID} req.params.id    The db-generated ID to match on
   * @returns {Object}            The updated cocktail
   */

  app.put(apiUrl + ':id', function(req, res) {
    var updatedDrink = {
      name: req.body.name,
      ingredients: req.body.ingredients.sort(),
      url: req.body.name
        .toLowerCase()
        .replace(/\s/g, '-')
    };
    Cocktail.findOneAndUpdate({ _id: req.params.id }, 
      updatedDrink, 
      function(err, dbResponse) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json(dbResponse);
    });
  });

  /**
   * Deletes a cocktail
   *
   * @param {ID} req.params.id      The ID of the cocktail to delete
   * @returns {Object}              A success message
   */

  app.delete(apiUrl + ':id', function(req, res) {
    Cocktail.remove({ _id: req.params.id }, function(err) {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json({ 'msg': 'Cocktail removed from db' });
    });
  });

};