const express = require("express");
const router = express.Router();
const EngineType = require("../../models/engineType");

router.post("/", async (req, res) => {
  try {
    const engineTypes = new EngineType(req.body);
    await engineTypes.save();
    res.status(201).json(engineTypes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const engineTypes = await EngineType.find();
    res.json(engineTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const engineType = await EngineType.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(engineType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await EngineType.findByIdAndDelete(req.params.id);
    res.json({ message: "Car tyoe delete " });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
