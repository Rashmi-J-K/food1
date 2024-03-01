// scheduler.js
const cron = require('node-cron');
const Order = require('./models/Order');

cron.schedule('*/20 * * * *', async () => {
  // Your logic to cancel orders that haven't been confirmed in 20 minutes
  console.log('Running the scheduled task...');
  await Order.updateMany(
    { status: 'pending', createdAt: { $lt: new Date(Date.now() - 20 * 60 * 1000) } },
    { $set: { status: 'canceled' } }
  );
  console.log('Scheduled task completed.');
});
