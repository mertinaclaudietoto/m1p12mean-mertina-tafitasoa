const express = require("express");
const router = express.Router();
const serviceCostumer = require("../../models/services/serviceCostumer");
const { sendValidationAppointment } = require("../email/mailer");

router.get("/story/:idcostumer", async (req, res) => {
  try {
    const skip = parseInt(req.query.skip) || 0; 
    const limit = parseInt(req.query.limit) || 10;
    const serviceCostumers = await serviceCostumer.find({ idcostumer: req.params.idcostumer })
    .populate(
      "idcostumer serviceList.idmechanic serviceList.service.idservice"
    ).skip(skip)
    .limit(limit);
    res.json(serviceCostumers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/", async (req, res) => {
  try {
    // console.log(req.body);
    const serviceCostumers = req.body;
    if (!serviceCostumers.idcostumer) {
      return res
        .status(400)
        .json({ error: "idcostumer is required for all service costumers." });
    }
    const service = new serviceCostumer(serviceCostumers);     
    await service.save();
    res.status(201).json(service);
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
    // console.log(req.body);
    const serviceCostumerById = await serviceCostumer
      .findById(req.params.id)
      .populate(
        "idcostumer serviceList.idmechanic serviceList.service.idservice"
      );
    if (!serviceCostumerById) {
      return res.status(404).json({ error: "Service costumer not found" });
    }
    if (serviceCostumerById.etats == 1) {
      return res.status(400).json({ error: "Service est supprimé" });
    }
    if (serviceCostumerById.etats !== 0) {
      return res.status(400).json({ error: "Service en cours de traitement." });
    }
    const service = await serviceCostumer.findByIdAndUpdate(req.params.id,req.body, {
          new: true,
    });
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const serviceCostumerById = await serviceCostumer
      .findById(req.params.id)
      .populate(
        "idcostumer serviceList.idmechanic serviceList.service.idservice"
      );
    if (!serviceCostumerById) {
      return res.status(404).json({ error: "Service costumer not found" });
    }
    if (serviceCostumerById.etats == 1) {
      return res.status(400).json({ error: "Service déjà annulé" });
    }
    if (serviceCostumerById.etats !== 0) {
      return res.status(400).json({ error: "Service en cours de traitement." });
    }
    await serviceCostumer.findByIdAndUpdate(
      req.params.id,
      { $set: { etats: 1 } },
      { new: true, runValidators: true }
    );
    res.json({ message: "Service costumer marked as deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/accept/:id", async (req, res) => {
  try {
    const serviceCostumerById = await serviceCostumer
      .findById(req.params.id)
      .populate(
        "idcostumer serviceList.idmechanic serviceList.service.idservice"
      );
    if (!serviceCostumerById) {
      return res.status(404).json({ error: "Service costumer not found" });
    }
    if (serviceCostumerById.etats == 1) {
      return res.status(400).json({ error: "Service est supprimé" });
    }
    await serviceCostumer.findByIdAndUpdate(
      req.params.id,
      { $set: { etats: 20 } },
      { new: true, runValidators: true }
    );
    res.json({ message: "Service costumer accepter" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/send-appointment/:id", async (req, res) => {
  try {
    const serviceCostumerById = await serviceCostumer
      .findById(req.params.id)
      .populate(
        "idcostumer serviceList.idmechanic serviceList.service.idservice"
      );
    if (!serviceCostumerById)
      return res.status(404).json({ error: "Service costumer not found" });
    sendValidationAppointment(
      "tafitasoaratsimbaha@gmail.com",
      serviceCostumerById.idcostumer.name +
        " " +
        serviceCostumerById.idcostumer.firstName,
      "12-04-2025 15:30",
      "huhu.com"
    );
    res.json({ message: "Rendez-vous envoyé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
