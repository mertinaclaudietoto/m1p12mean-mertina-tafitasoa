const mongoose = require('mongoose');
const Emp = require('../emp/emp'); 
const Service01 = require('./service01'); 
const serviceCostumerSchema = new mongoose.Schema({
  idcostumer: { type: mongoose.Schema.Types.ObjectId, ref: 'Emp', required: true },
  idmechanic: { type: mongoose.Schema.Types.ObjectId, ref: 'Emp', required: true },
  service:   {
              idservice: { type: mongoose.Schema.Types.ObjectId, ref: "Service01",required: true },
              price: { type: Number, required: true },
              time: { type: Number, required: true },
          },
  startdate:{ type: Date, required: true },
  enddate:{ type: Date, required: true },
  nbrstars:{ type: Date, required: true },
});
const model = mongoose.model('Servicecostumer', serviceCostumerSchema);
module.exports = model;
