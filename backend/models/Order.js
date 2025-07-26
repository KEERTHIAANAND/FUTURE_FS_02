const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  items: [
    {
      productId: String,
      name: String,
      quantity: Number,
      price: Number
    }
  ],
  total: { type: Number, required: true },
  address: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema); 