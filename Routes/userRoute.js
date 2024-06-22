const express = require('express');
const router = express.Router();
const User = require('../Model/user');
const geoip = require('geoip-lite');
const useragent = require('useragent');
const nodemailer = require('nodemailer');

// Nodemailer setup (replace with your credentials)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// User login route
router.post('/login', async (req, res) => {
  const { email } = req.body;
  const ip = req.ip;
  const geo = geoip.lookup(ip);
  const agent = useragent.parse(req.headers['user-agent']);
  const browser = agent.toAgent();
  const os = agent.os.toString();
  const deviceType = agent.device.toString();
  const loginTime = new Date();
  const location = geo ? `${geo.city}, ${geo.country}` : 'Unknown';

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, loginHistory: [] });
    }

    user.loginHistory.push({
      ip,
      location,
      browser,
      os,
      deviceType,
      loginTime,
    });

    if (browser.includes('Chrome')) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpiration = new Date(Date.now() + 10 * 60000); // OTP valid for 10 minutes
      user.otp = otp;
      user.otpExpiration = otpExpiration;

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
      });

      await user.save();
      res.status(200).send('OTP sent to email');
    } else if (browser.includes('Edge') || browser.includes('IE')) {
      await user.save();
      res.status(200).send('Login successful without authentication');
    } else {
      res.status(400).send('Unsupported browser');
    }
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).send('Internal Server Error');
  }
});

// OTP verification route
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || new Date() > user.otpExpiration) {
      res.status(400).send('Invalid OTP or OTP expired');
      return;
    }

    user.otp = null;
    user.otpExpiration = null;
    await user.save();

    res.status(200).send('Login successful with OTP');
  } catch (error) {
    console.error('Error in OTP verification:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Additional user routes can be added here

module.exports = router;
