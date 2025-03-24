const mongoose = require('mongoose');
const sexTypeSchema = new mongoose.Schema({
    name: { type: String, required: true },
}, { timestamps: true });
module.exports = mongoose.model('Sex', sexTypeSchema);