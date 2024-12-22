const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    category: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: Number, default: 0 },
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Complaint', complaintSchema);
