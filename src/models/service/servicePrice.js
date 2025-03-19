const mongoose = require('mongoose');

const Car = require('../car/car'); 
const Service = require('./service'); 


const ServicePriceSchema = new mongoose.Schema({
  price: { type: Number, required: true , min: 0 },
  car:{ type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  service:{ type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
});
ServicePriceSchema.index({ car: 1, service: 1 }, { unique: true });
const  ServicePrice= mongoose.model('ServicePrice', ServicePriceSchema);
module.exports = ServicePrice;