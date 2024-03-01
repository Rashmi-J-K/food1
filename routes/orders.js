// routes/orders.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');

// Endpoint to place an order
router.post('/place-order', async (req, res) => {
  try {
    // Assuming you receive order details in the request body
    const { foodId, userId, userAddressId, paymentMode } = req.body;

    // Generate OTP
    const otp = randomstring.generate(6);

    // Save the order
    const order = await Order.create({
      foodId,
      userId,
      orderId: randomstring.generate(10),
      userAddressId,
      paymentMode,
      otp,
    });

    // Send OTP via email (implement your email logic here)
    await sendOtpEmail(order.userId, order.otp);

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error placing order' });
  }
});

// Function to send OTP via email (implement your email logic here)
async function sendOtpEmail(userId, otp) {
  // Implementation using nodemailer
  // You need to configure nodemailer with your email provider
  // Here's a basic example assuming you have a Gmail account

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'recipient-email@example.com',
    subject: 'OTP Confirmation',
    text: `Your OTP for order confirmation is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = router;
