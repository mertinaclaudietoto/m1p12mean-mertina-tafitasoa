const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sizeType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SizeType",
      required: true,
    },
    sizeTypePrice: { type: Number, required: true },
    carType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CarType",
      required: true,
    },
    carTypePrice: { type: Number, required: true },
    engineType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EngineType",
      required: true,
    },
    engineTypePrice: { type: Number, required: true },
    weigthType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WeigthType",
      required: true,
    },
    weigthTypePrice: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
