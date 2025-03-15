const mongoose = require('mongoose');
const Service = require('../service/service');
const Rule = require('../emp/rule');
const EmpSchema = new mongoose.Schema({
  name: { type: String, required: true },
  firstName: { type: String, required: true },
  dateofbirth: { type: String, required: true },
  dateofemp: { type: String, required: true },
  login: {type: String,required: true, unique: true},
  rule:{ type: mongoose.Schema.Types.ObjectId, ref: 'Rule', required: true },
  password: {type: String},
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true }]
});

const Emp = mongoose.model('Emp', EmpSchema);
module.exports = Emp;

// , required: true