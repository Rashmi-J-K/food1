// server.js
const express = require('express');
const mongoose = require('mongoose');
const cronJob = require('./scheduler');  // Adjust the path accordingly
const foodsRouter = require('./routes/foods');
const ordersRouter = require('./routes/orders');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

