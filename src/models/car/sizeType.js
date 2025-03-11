const mongoose = require('mongoose');
const SizeTypesSchema = new mongoose.Schema({
    name: { type: String, required: true },
}, { timestamps: true });
module.exports = mongoose.model('sizetypes', SizeTypesSchema);

