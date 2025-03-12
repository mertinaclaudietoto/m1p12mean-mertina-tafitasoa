const mongoose = require('mongoose');
const EngineTypeSchema = new mongoose.Schema({
    name: { type: String, required: true },
}, { timestamps: true });
module.exports = mongoose.model('EngineType', EngineTypeSchema);

