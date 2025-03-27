const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sizeTypePrice: { type: Number, required: true },
    carTypePrice: { type: Number, required: true },
    engineTypePrice: { type: Number, required: true },
    weigthTypePrice: { type: Number, required: true },
    etat: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
