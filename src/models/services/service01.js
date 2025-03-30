const mongoose = require("mongoose");
const service01Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Service01", service01Schema);
