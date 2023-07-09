const mongoose = require('mongoose');
const Users = require('./Users');
const Admin = require('./Admin');
const Rat = require('./review');

const cart = mongoose.Schema({
  products: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Admin,
  },
  productUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Users,
  },
  time: {
    type: Date,
  },
  range: {
    type: Number,
    required: true,
  },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: Rat }],
});

const Cart = mongoose.model('cart', cart);

module.exports = Cart;
