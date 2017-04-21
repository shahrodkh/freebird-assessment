const Offer = require('../models/offerModel');

function createOffer(request, reply) {
  const newOffer = new Offer(request.payload);
  newOffer.save((err, offer) => {
    if (err) return reply(err);
    reply(offer).code(200);
  });
}

function deleteOffer(request, reply) {
  const id = encodeURIComponent(request.params.id);
  Offer.remove({ id }, (err) => {
    if (err) return reply(err);
    reply().code(200);
  });
}

function getOffers(request, reply) {
  const limit = request.params.limit ? 
    { limit: parseInt(encodeURIComponent(request.params.limit), 10) } :
    null;
  Offer.find({}, null, limit, (err, offers) => {
    if (err) return reply(err);
    reply(offers).code(200);
  })
}

module.exports = { createOffer, deleteOffer, getOffers };
