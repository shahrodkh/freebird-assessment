const app = require('./../server');
const request = require('supertest')(app.listener);
const assert = require('assert');
const Offer = require('../models/offerModel');

describe('Routes', function() {
  before(function(done) {
    const testOffers = [
      {
        id: "1",
        name: "shahrod",
        amount: 9000,
        maximumRides: 3
      },
      {
        id: "2",
        name: "me",
        amount: 7,
        maximumRides: 0
      },
      {
        id: "3",
        name: "myself",
        amount: 42,
        maximumRides: 5
      },
    ];

    Offer.remove({}, (err) => {
      if (err) done(err);
      Offer.create(testOffers, (err) => {
        if (err) done(err);
        done();
      });
    });

  });

  describe('POST /offer', function() {
    it('responds with status 200 OK', function(done) {
      const data = {
        id: "4",
        name: "steve",
        amount: 1,
        maximumRides: 2.2
      };
      request.post('/offer')
      .send(data)
      .expect(200, done);
    });
    it('stores maximumRides as Int', function(done) {
      Offer.findOne({ id: 4 }, function(err, offer) {
        assert.ok(Number.isInteger(offer.maximumRides));
        done();
      });
    });
    it('adds an offer to db', function(done) {
      Offer.find({}, function(err, offers) {
        assert.equal(4, offers.length);
        done();
      });
    });
  });

  describe('DELETE /offer/:id', function() {
    it('responds with status 200 OK', function(done) {
      request.delete('/offer/4')
      .expect(200, done);
    });
    it('deletes an offer from db', function(done) {
      Offer.find({}, function(err, offers) {
        assert.equal(3, offers.length);
        done();
      });
    });
  });

  describe('GET /offers/:limit', function() {
    it('responds with status 200 OK', function(done) {
      request.get('/offers/')
      .expect(200, done)
    });
    it('reponds with an Array', function(done) {
      request.get('/offers/')
      .expect((res) => {
        if (!Array.isArray(res.body)) throw new Error('not an Array');
      })
      .end(done);
    });
    it('limits offers if given', function(done) {
      request.get('/offers/1')
      .expect((res) => {
        if (res.body.length !== 1) throw new Error('wrong length')
      })
      .end(done);
    });
    it('does not limit if not given', function(done) {
      request.get('/offers/')
      .expect((res) => {
        if (res.body.length !== 3) throw new Error('wrong length')
      })
      .end(done);
    });
  });
});
