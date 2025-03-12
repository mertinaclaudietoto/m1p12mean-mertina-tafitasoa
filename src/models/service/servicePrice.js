const mongoose = require('mongoose');

const Car = require('../car/car'); 
const Service = require('./service'); 


const ServicePriceSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  car:{ type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  service:{ type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
});

const  ServicePrice= mongoose.model('ServicePrice', ServicePriceSchema);
module.exports = ServicePrice;