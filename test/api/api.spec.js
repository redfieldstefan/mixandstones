'use strict';
/* jshint expr:true */

var port = require('../../server').port,
  chai = require('chai'),
  expect = chai.expect,
  chaihttp = require('chai-http'),
  localUrl = 'http://localhost:' + port,
  apiPath = '/api/cocktails/',
  testId;

chai.use(chaihttp);

describe('The cocktail API', function() {

  it('Adds new cocktails (via POST)', function(done) {
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
      expect(res.body).to.have.property('_id');
      
      testId = res.body._id;
      
      done();
    });
  });

  it('Returns individual cocktails (via GET)', function(done) {
    chai.request(localUrl)
    .get(apiPath + testId)
    .end(function(err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body.name).to.eql('Fictional cocktail');
      done();
    });
  });

  it('Searches for cocktails that match an ingredient list (via GET)', function(done) {
    chai.request(localUrl)
    .get('/api/search')
    .send({
      'ingredients': [
        'gin',
        'peanut butter'
      ]
    })
    .end(function(err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(Array.isArray(res.body)).to.eql(true);
      expect(res.body[0].name).to.eql('Fictional cocktail');
      done();
    });
  });

  it('Updates cocktails (via PUT)', function(done) {
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
        'peanut butter',
        'jelly'
      ]);
      done();
    });
  });

  it('Removes cocktails (via DELETE)', function(done) {
    chai.request(localUrl)
    .del(apiPath + testId)
    .end(function(err, res) {
      expect(err).to.be.null;
      expect(res.body.msg).to.equal('Cocktail removed from db');
      done();
    });
  });

});