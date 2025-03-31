const express = require("express");
const router = express.Router();
const serviceCostumer = require("../../models/services/serviceCostumer");

router.post("/", async (req, res) => {
  try {
    const serviceCostumers = req.body;
    for (let serviceCostumer of serviceCostumers) {
      if (!serviceCostumer.idcostumer) {
        return res
          .status(400)
          .json({ error: "idcostumer is required for all service costumers." });
      }
    }
    const insertedServiceCostumers = await serviceCostumer.insertMany(
      serviceCostumers
    );
    res.status(201).json(insertedServiceCostumers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all service costumers
router.get("/", async (req, res) => {
  try {
    const serviceCostumers = await serviceCostumer
      .find()
      .populate(
        "idcostumer serviceList.idmechanic serviceList.service.idservice"
      );
    res.json(serviceCostumers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all service costumers active
router.get("/active", async (req, res) => {
  try {
    const activeServiceCostumers = await serviceCostumer
      .find({ etats: 0 })
      .populate(
        "idcostumer serviceList.idmechanic serviceList.service.idservice"
      );
    res.json(activeServiceCostumers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single service costumer by ID
router.get("/:id", async (req, res) => {
  try {
    const serviceCostumerById = await serviceCostumer
      .findById(req.params.id)
      .populate(
        "idcostumer serviceList.idmechanic serviceList.service.idservice"
      );
    if (!serviceCostumerById)
      return res.status(404).json({ error: "Service costumer not found" });
    res.json(serviceCostumerById);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a service costumer by ID
router.put("/:id", async (req, res) => {
  try {
    const serviceCostumerById = await serviceCostumer
      .findById(req.params.id)
      .populate(
        "idcostumer serviceList.idmechanic serviceList.service.idservice"
      );
    if (!serviceCostumerById) {
      return res.status(404).json({ error: "Service costumer not found" });
    }
    if (serviceCostumerById.etats !== 0) {
      return res.status(400).json({ error: "Service déjà validé" });
    }
    await serviceCostumer.findByIdAndDelete(req.params.id);
    const serviceCostumers = req.body;
    for (let serviceCostumer of serviceCostumers) {
      if (!serviceCostumer.idcostumer) {
        return res
          .status(400)
          .json({ error: "idcostumer is required for all service costumers." });
      }
    }
    const newServiceCostumer = await serviceCostumer.insertMany(
      serviceCostumers
    );
    res.status(201).json(newServiceCostumer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const updatedServiceCostumer = await serviceCostumer.findByIdAndUpdate(
      req.params.id,
      { $set: { etats: 1 } },
      { new: true, runValidators: true }
    );
    if (!updatedServiceCostumer)
      return res.status(404).json({ error: "Service costumer not found" });
    res.json({ message: "Service costumer marked as deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
