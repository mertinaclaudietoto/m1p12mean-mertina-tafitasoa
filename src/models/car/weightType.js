const mongoose = require('mongoose');
const weightTypesSchema = new mongoose.Schema({
    name: { type: String, required: true },
}, { timestamps: true });
module.exports = mongoose.model('weighttypes', weightTypesSchema);

