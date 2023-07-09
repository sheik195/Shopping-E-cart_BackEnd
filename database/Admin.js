const mongoose = require('mongoose');
const Users=require("./Users");

const dressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required:true
  },
  age:{
    type:String,
    required: function() {
      return this.type === 'Kids';
    }
  },
  price: {
    type: Number,
    required: true
  },
  sizes: {
    type: [String],
    required: function() {
      return this.type !== 'Kids';
    }
  },
  quantity:{
    type: [Number],
    required: true
  },
  colors: {
    type: [String],
    required: true
  },
  sleeve:{
    type:String,
    required: function() {
      return this.type === 'shirt' || this.type==='t-shirt';
    }
  },
  fabric: {
    type: String,
    required: function() {
      return this.type === 'saree' || this.type==='shirt';
    }
  },
  description: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    required: true
  },
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  reviews: [{
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'u1'
    },
    username: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    userreview:{
      type: String,
      required: true
    }
  }]
});

const Dress = mongoose.model('Dress', dressSchema);

module.exports = Dress;
