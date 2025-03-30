const mongoose = require('mongoose');
const Service01= require('./service01'); 
const CarSchema = new mongoose.Schema({
  picture: { type: String, required: true },
  brandandmodel: { type: String, required: true },
  servicelist:[
        {
            idservice: { type: mongoose.Schema.Types.ObjectId, ref: "Service01",required: true },
            price: { type: Number, required: true },
            time: { type: Number, required: true },
        }
    ]
    });
const Car = mongoose.model('Car', CarSchema);
module.exports = Car;