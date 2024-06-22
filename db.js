const mongoose = require('mongoose');
require('dotenv').config();

const DATABASE = process.env.DATABASEURL;
const url = DATABASE;

const connect = () => {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Database is connected');
    })
    .catch((err) => {
      console.error('Database connection error:', err);
    });
};

module.exports = { connect };
