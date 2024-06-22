const mongoose = require('mongoose');

const loginHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    date: { type: Date, default: Date.now },
    ipAddress: { type: String, required: true },
    device: { type: String, required: true },
    browser: { type: String, required: true }
});

module.exports = mongoose.model('LoginHistory', loginHistorySchema);
