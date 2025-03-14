const mongoose = require('mongoose');
const Service = require('../service/service');
const EmpSchema = new mongoose.Schema({
  name: { type: String, required: true },
  firstName: { type: String, required: true },
  dateofbirth: { type: String, required: true },
  dateofemp: { type: String, required: true },
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true }]
});

const Emp = mongoose.model('Emp', EmpSchema);
module.exports = Emp;