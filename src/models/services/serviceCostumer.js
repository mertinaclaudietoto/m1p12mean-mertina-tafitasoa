const mongoose = require("mongoose");
const serviceCostumerSchema = new mongoose.Schema({
  idcostumer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Emp",
    required: true,
  },
  etats: { type: Number, default: 0 },
  serviceList: [
    {
      idmechanic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Emp",
        default: null,
      },
      service: {
        idservice: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Service01",
          required: true,
        },
        price: { type: Number, required: true },
        time: { type: Number, required: true },
      },
      startdate: { type: Date, default: null },
      enddate: { type: Date, default: null },
      nbrstars: { type: Number, default: null },
      idcar: { type: String, default: null },
      brandandmodel: { type: String, default: null },
      picture: { type: String, default: null },
    },
  ],
});
const model = mongoose.model("Servicecostumer", serviceCostumerSchema);
module.exports = model;
