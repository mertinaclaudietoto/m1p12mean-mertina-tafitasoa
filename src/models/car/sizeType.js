const mongoose = require('mongoose');
const SizeTypeSchema = new mongoose.Schema({
    name: { type: String, required: true },
}, { timestamps: true });
module.exports = mongoose.model('SizeType', SizeTypeSchema);

