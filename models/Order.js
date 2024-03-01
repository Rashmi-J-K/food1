// models/order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  orderId: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'confirmed', 'canceled'], default: 'pending' },
  userAddressId: String,
  paymentMode: String,
  otp: String,
});

module.exports = mongoose.model('Order', orderSchema);
