const app = require('./../server');
const request = require('supertest')(app.listener);
const Offer = require('../models/offerModel');

describe('Routes', function() {
  before(function(done) {
    Offer.remove({}, (err) => {
      if (err) done(err);
      done();
    });
  });

  describe('POST /offer', function() {
    it('responds with status 200 OK', function(done) {
      const data = {
        id: "1",
        name: "shahrod",
        amount: 9000,
        maximumRides: 3
      }
      request.post('/offer')
      .send(JSON.stringify(data))
      .expect(200, done);
    });
  });
});
