const mongoose = require("mongoose");
const weigthTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    percentage: { type: Number, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("WeigthType", weigthTypeSchema);
