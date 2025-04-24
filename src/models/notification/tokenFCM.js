const mongoose = require("mongoose");
const Emp = require('../emp/emp');
const Rule = require('../emp/rule');

const TokenFCMSchema = new mongoose.Schema(
  {
    token: { type: String, required: true },
    idrule: { type: mongoose.Schema.Types.ObjectId, ref: 'Rule',required:true },
    iduser: { type: mongoose.Schema.Types.ObjectId, ref: 'Emp',required:true },
    expire: { type: Date, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("TokenFCM", TokenFCMSchema);