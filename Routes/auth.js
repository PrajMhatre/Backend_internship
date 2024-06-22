const express = require('express');
const router = express.Router();
const User = require('../Model/user');
const LoginHistory = require('../Model/LoginHistory');
const jwt = require('jsonwebtoken');
const { getClientIp } = require('request-ip');
const useragent = require('useragent');

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !user.comparePassword(password)) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Get client IP address
        const ipAddress = getClientIp(req);

        // Get client device and browser information
        const agent = useragent.parse(req.headers['user-agent']);
        const device = agent.device.toString();
        const browser = agent.toAgent();

        // Save login history
        const loginHistory = new LoginHistory({
            userId: user._id,
            ipAddress,
            device,
            browser
        });
        await loginHistory.save();

        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
