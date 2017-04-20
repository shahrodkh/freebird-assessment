const mongoose = require('mongoose');

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/freebird-assessment');

const offerSchema = new Schema({
  id: String,
  name: String,
  amount: Number,
  maximumRides: {
    type: Number,
    get: v => Math.round(v),
    set: v => Math.round(v)
  }
});

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;
