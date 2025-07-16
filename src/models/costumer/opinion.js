const mongoose = require('mongoose');

const opionSchema = new mongoose.Schema({
    costumer: { type: mongoose.Schema.Types.ObjectId, ref: 'Emp',required: true },
    message: { type: String ,required: true},
    date: { type: Date, default: () => new Date() }
});
module.exports = mongoose.model('opinion', opionSchema);