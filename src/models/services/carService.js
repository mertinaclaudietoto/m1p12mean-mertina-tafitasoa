const mongoose = require('mongoose');
const Service01= require('./service01'); 
const CarserviceSchema = new mongoose.Schema({
  picture: { type: String, required: true },
  brandandmodel: { type: String, required: true },
  servicelist:[
        {
            idservice: { type: mongoose.Schema.Types.ObjectId, ref: "Service01",required: true },
            price: { type: Number, required: true },
            time: { type: Number, required: true },
            commission: { type: Number, required: true },
        }
    ]
    });
const Car = mongoose.model('Carservice', CarserviceSchema);
module.exports = Car;