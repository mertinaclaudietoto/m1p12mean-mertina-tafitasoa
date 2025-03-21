const express = require("express");
const router = express.Router();
const sizeType = require("../models/sizeType");

router.post("/", async (req, res) => {
  try {
    const sizeTypes = new sizeType(req.body);
    await sizeTypes.save();
    res.status(201).json(sizeTypes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const sizeTypes = await sizeType.find();
    res.json(sizeTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const sizeType = await sizeType.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(sizeType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await sizeType.findByIdAndDelete(req.params.id);
    res.json({ message: "Car tyoe delete " });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
