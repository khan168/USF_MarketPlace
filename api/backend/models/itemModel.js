const mongoose = require('mongoose');

const itemSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      default: 1
    },
    category: {
      type: String,
      required: true
    },
    images: [{
      type: String,
      required: false
    }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Item', itemSchema);
