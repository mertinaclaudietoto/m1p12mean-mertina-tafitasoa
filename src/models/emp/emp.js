<<<<<<< HEAD
const mongoose = require("mongoose");
const Service = require("../service");
const Rule = require("../emp/rule");
const EmpSchema = new mongoose.Schema({
  picture: { type: String, required: true },
  name: { type: String, required: true },
  firstName: { type: String, required: true },
  dateofbirth: { type: String, required: true },
  dateofemp: { type: String, required: true },
  login: { type: String, required: true, unique: true },
  rule: { type: mongoose.Schema.Types.ObjectId, ref: "Rule", required: true },
  password: { type: String },
  skills: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
  ],
});

const Emp = mongoose.model("Emp", EmpSchema);
=======
const mongoose = require('mongoose');
const Service = require('../service/service');
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
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }]
});
const Emp = mongoose.model('Emp', EmpSchema);
>>>>>>> feature
module.exports = Emp;

// , required: true
