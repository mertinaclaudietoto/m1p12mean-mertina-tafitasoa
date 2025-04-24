const mongoose = require('mongoose');
const Rule = require('../emp/rule');
const Sex = require('../emp/sex');

const EmpSchema = new mongoose.Schema({
  picture:{ type: String },
  name: { type: String, required: true },
  firstName: { type: String, required: true },
  dateofbirth: { type: String, required: true },
  sex:{type: mongoose.Schema.Types.ObjectId, ref: 'Sex',required:true},
  dateofemp: { type: String  },
  login: {type: String,required: true, unique: true},
  rule:{ type: mongoose.Schema.Types.ObjectId, ref: 'Rule', required: true },
  password: {type: String,required: true,},
  active:{type:Number,required: true},
});
const Emp = mongoose.model('Emp', EmpSchema);
module.exports = Emp;
