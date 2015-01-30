'use strict';
/* jshint expr:true */

var port = require('../../server').port,
  chai = require('chai'),
  expect = chai.expect,
  chaihttp = require('chai-http'),
  localUrl = 'http://localhost:' + port,
  apiPath = '/api/cocktails/',
  testDrink,
  testId;

chai.use(chaihttp);

describe('The cocktail API', function() {

  it('Can add a new cocktail', function(done) {
    chai.request(localUrl)
    .post(apiPath)
    .send({
      'name': 'Fictional cocktail',
      'ingredients': [
        'gin',
        'peanut butter'
      ]
    })
    .end(function(err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body.url).to.eql('fictional-cocktail');
      
      testDrink = res.body.url;
      testId = res.body._id;
      
      done();
    });
  });

  // it('Can find cocktails that match an ingredient list', 
  //   function(done) {
  //     chai.request(localUrl)
  //     .get('/api/search')
  //     .send({
  //       'ingredients': [
  //         'gin',
  //         'peanut butter'
  //       ]
  //     })
  //     .end(function(err, res) {
  //       expect(err).to.be.null;
  //       expect(res).to.have.status(200);
  //       expect(Array.isArray(res.body)).to.eql(true);
  //       expect(res.body[0].name).to.eql('Fictional cocktail');
  //       done();
  //     });

  // });

  // it('Matches regardless of ingredient order', function(done) {
  //   chai.request(localUrl)
  //   .get('/api/search')
  //   .send({
  //     'ingredients': [
  //       'peanut butter',
  //       'gin'
  //     ]
  //   })
  //   .end(function(err, res) {
  //     expect(res.body[0].name).to.eql('Fictional cocktail');
  //     done();
  //   });
  // });

  it('Can update cocktails', function(done) {
    chai.request(localUrl)
    .put(apiPath + testId)
    .send({
      'name': 'Updated fictional cocktail',
      'ingredients': [
        'gin',
        'peanut butter',
        'jelly'
      ]
    })
    .end(function(err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body.name).to.eql('Updated fictional cocktail');
      expect(res.body.url).to.eql('updated-fictional-cocktail');
      expect(res.body.ingredients).to.eql([
        'gin',
        'jelly',
        'peanut butter' // Note that sorted by db
      ]);
      done();
    });
  });

  it('Can delete cocktails', function(done) {
    chai.request(localUrl)
    .del(apiPath + testId)
    .end(function(err, res) {
      expect(err).to.be.null;
      expect(res.body.msg).to.equal('Cocktail removed from db');
      done();
    });
  });

});