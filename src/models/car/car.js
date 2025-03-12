const mongoose = require('mongoose');
const CarType = require('./carType'); 
const EngineType = require('./engineType'); 
const SizeType = require('./sizeType'); 
const WeightType = require('./weightType'); 

const CarSchema = new mongoose.Schema({
  picture: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  version: { type: String, required: true },
  datesortie: { type: Date, required: true },
  empathement:{ type: String, required: true },
  carType: { type: mongoose.Schema.Types.ObjectId, ref: 'CarType', required: true },
  engineType: { type: mongoose.Schema.Types.ObjectId, ref: 'EngineType', required: true },
  sizeType: { type: mongoose.Schema.Types.ObjectId, ref: 'SizeType', required: true },
  weightType: { type: mongoose.Schema.Types.ObjectId, ref:'WeightType', required: true },
});

const Car = mongoose.model('Car', CarSchema);
module.exports = Car;
