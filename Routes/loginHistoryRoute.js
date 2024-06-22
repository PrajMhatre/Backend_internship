const express = require('express');
const router = express.Router();
const LoginHistory = require('../Model/LoginHistory');
const { verifyToken } = require('../middleware/authMiddleware');

// Route to get login history
router.get('/loginHistory/:userId', verifyToken, async (req, res) => {
    const { userId } = req.params;

    try {
        const loginHistory = await LoginHistory.find({ userId }).sort({ date: -1 });
        res.json(loginHistory);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
