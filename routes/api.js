'use strict';

var Cocktail = require('../models/cocktailModel'),
  Ingredient = require('../models/ingredientModel'),
  urlify,
  prepForDb;

/**
 * Helper function: formats cocktail names for URL routing
 *
 * e.g., 'Whiskey, neat' -> 'whiskey-neat'
 *
 * @param {String} cocktailName   The name to be formatted
 * @returns {String}              The URL-ready version
 */

urlify = function(cocktailName) {
  return cocktailName
    .toLowerCase()
    .replace(/\s/g, '-') // Spaces -> hyphens
    .replace(/[^A-Za-z0-9\-]/g, '') // Removes everything that's not a letter, number, or hyphen
    .replace(/-{2,}/g, '-'); // Cleans up double (or more) hyphens
};

/**
 * Helper function: standardizes data for new and updated cocktails
 *
 * @param {Object} cocktail   The new cocktail to prep (usually req.body)
 * @returns {Object}          The cocktail with sorted ingredients and routing-ready URL string
 */

prepForDb = function(cocktail) {
  return {
    name: cocktail.name,
    url: urlify(cocktail.name),
    description: cocktail.description ?
      cocktail.description :
      '',
    ingredients: cocktail.ingredients ?
      cocktail.ingredients.sort() :
      []
  };
};

module.exports = function(app) {

  var apiUrl = '/api/cocktails/';

  /**
   * Saves a new cocktail in the database
   *
   * @param {Object} req.body   The new cocktail
   * @returns {Object}          The cocktail as saved in the db
   */

  app.post(apiUrl, function(req, res) {
    var cocktail = new Cocktail(prepForDb(req.body));
    cocktail.save(function(err, dbResponse) {
      if (err) {
        throw err;
      }

      /**
       * Saves each ingredient if it doesn't already exist
       */

      dbResponse.ingredients.forEach(function(ingredient) {
        Ingredient.find({ name: ingredient }, function(err, dbResponse) {
          if (err) {
            throw err;
          }
          if (!dbResponse.length) {
            console.log('saving new ingredient: ' + ingredient);
            var newIngredient = new Ingredient({ name: ingredient });
            newIngredient.save(function(err) {
              if (err) {
                throw err;
              }
            });
          }
        });
      });
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
    Cocktail.find({
      ingredients: {
        $not: {
          $elemMatch: {
            $nin: req.body.ingredients
          }
        }
      }
    }, function(err, dbResponse) {
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
    var updatedDrink = prepForDb(req.body);
    Cocktail.findOneAndUpdate({ _id: req.params.id }, 
      updatedDrink, 
      function(err, dbResponse) {
        if (err) {
          throw err;
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
        throw err;
      }
      return res.status(200).json({ 'msg': 'Cocktail removed from db' });
    });
  });

};