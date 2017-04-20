const Offer = require('../models/offer-model');

function createOffer(req, res) {
  Offer.create(req.payload, (err, offer) => {
    if (err) return console.error(err);
    res('Posted offer ' + JSON.stringify(offer));
  });
}

function deleteOffer(req, res) {
  Offer.remove({ id: encodeURIComponent(req.params.id) }, (err, offer) => {
    if (err) return console.error(err);
    res('Deleted offer ' + JSON.stringify(offer));
  });
}

function getOffers(req, res) {
  const limit = req.params.limit ? 
    { limit : parseInt(encodeURIComponent(req.params.limit), 10) } :
    null;
  Offer.find({}, null, limit, (err, offers) => {
    if (err) return console.error(err);
    res(offers);
  })
}

module.exports = { createOffer, deleteOffer, getOffers };
