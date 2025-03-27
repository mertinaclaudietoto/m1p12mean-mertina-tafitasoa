const express = require("express");
const router = express.Router();
const Service = require("../models/service");

router.post("/", async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const service = await Service.find({ etat: 0 });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
      .where("etat")
      .equals(0);
    if (!service) {
      return res.status(404).json({ message: "Service non trouvé" });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service non trouvé" });
    }
    if (service.etat === 10) {
      return res
        .status(400)
        .json({ message: "Ce service est déjà marqué comme supprimé" });
    }
    await Service.updateOne({ _id: req.params.id }, { etat: 10 });
    res.json({ message: "Service mis à jour avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
