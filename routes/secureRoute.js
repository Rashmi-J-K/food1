// scheduler.js
const cron = require('node-cron');
const Order = require('./models/Order');

// This function will be executed every 20 minutes
cron.schedule('*/20 * * * *', async () => {
  console.log('Running scheduled job...');

  try {
    // Find orders with status 'pending' and createdAt more than 20 minutes ago
    const twentyMinutesAgo = new Date(Date.now() - 20 * 60 * 1000);
    const ordersToCancel = await Order.find({
      status: 'pending',
      createdAt: { $lte: twentyMinutesAgo },
    });

    // Cancel each order
    for (const order of ordersToCancel) {
      order.status = 'canceled';
      await order.save();
      console.log(`Order ${order.orderId} canceled due to non-confirmation.`);
    }
  } catch (error) {
    console.error('Error in scheduled job:', error);
  }
});

module.exports = cron;
  