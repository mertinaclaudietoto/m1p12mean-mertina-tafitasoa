const mongoose = require('mongoose');
const CarType = require('../car/carType'); 
const EngineType = require('../car/engineType'); 
const SizeType = require('../car/sizeType'); 
const WeigthType = require('../car/weigthType'); 
const Emp = require('../emp/emp'); 

const CarCostumerSchema = new mongoose.Schema({
  picture: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  version: { type: String, required: true },
  datesortie: { type: Date, required: true },
  empathement:{ type: String, required: true },
  carType: { type: mongoose.Schema.Types.ObjectId, ref: 'CarType', required: true },
  engineType: { type: mongoose.Schema.Types.ObjectId, ref: 'EngineType', required: true },
  sizeType: { type: mongoose.Schema.Types.ObjectId, ref: 'SizeType', required: true },
  weigthType: { type: mongoose.Schema.Types.ObjectId, ref:'WeigthType', required: true },
  costumer:{type: mongoose.Schema.Types.ObjectId,ref:'Emp', required: true}
});
const Car = mongoose.model('CarCostumer', CarCostumerSchema);
module.exports = Car;
