const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  loginHistory: [
    {
      ip: String,
            device: String,
            os: String,
            browser: String,
            timestamp: { type: Date, default: Date.now }
    },
  ],
  otp: String,
  otpExpiration: Date,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
