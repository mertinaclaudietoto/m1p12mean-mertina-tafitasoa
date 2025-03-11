const mongoose = require('mongoose');
const EngineTypesSchema = new mongoose.Schema({
    name: { type: String, required: true },
}, { timestamps: true });
module.exports = mongoose.model('enginetypes', EngineTypesSchema);

