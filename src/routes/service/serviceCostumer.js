const express = require("express");
const router = express.Router();
const serviceCostumer = require("../../models/costumer/serviceCostumer");
const { sendValidationAppointment } = require("../email/mailer");
const InvoiceData = require("../../models/costumer/invoice");
const { sendValidationEmailWithInvoice } = require("../../routes/email/mailer");
const easyinvoice = require("easyinvoice");
const emp = require('../../models/emp/emp');
const ApiResponse= require('../../models/apiResponse/ApiResponse');
const {notifNewTacheMechanic,notifAfterRequestServiceCostumeur} = require('../../routes/notification/sendNotificationToAll');
router.get("/service-detaille/:id", async (req, res) => {
  try {
    const result = await serviceCostumer.findById(req.params.id)
        .populate({
          path: "idcostumer",
          select: "name firstname",
        })
        .populate({
          path: "serviceList.idmechanic",
          select: "name firstname",
        })
        .populate({
          path: "serviceList.service.idservice",
          select: "name",
        });
    return res.status(200).json(ApiResponse.success(`Select avarage time with average-time `,result));
  } catch (error) {
    return res.status(500).json(ApiResponse.error(`Eroor 500  `,[{ message: 
      error.message
    }]));
  }
});

router.get("/etats-service/:etats", async (req, res) => {
  try {
    const values = await serviceCostumer.find({etats: req.params.etats})
      .populate("idcostumer", "name firstName picture")
    return res.status(200).json(ApiResponse.success(`Select waiting service`,values));
  } catch (error) {
    return res.status(500).json(ApiResponse.error(`Eroor 500  `,[{ message: 
      error.message
    }]));
  }
});

router.get("/revenue/month", async (req, res) => {
  try {
    const result = await serviceCostumer.aggregate([
      { $unwind: "$serviceList" },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m", date: "$serviceList.startdate" },
          },
          total: { $sum: "$serviceList.service.price" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    return res.status(200).json(ApiResponse.success(`Select revenu by month `,result));
  } catch (error) {
    return res.status(500).json(ApiResponse.error(`Eroor 500  `,[{ message: 
      error.message
    }]));
  }
});

router.get("/revenue/day", async (req, res) => {
  try {
    const result = await serviceCostumer.aggregate([
      { $unwind: "$serviceList" },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$serviceList.startdate" },
          },
          total: { $sum: "$serviceList.service.price" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    return res.status(200).json(ApiResponse.success(`Select revenu by days `,result));
  } catch (error) {
    return res.status(500).json(ApiResponse.error(`Eroor 500  `,[{ message: 
      error.message
    }]));
  }
});

router.get("/reservations/month", async (req, res) => {
  try {
    const result = await serviceCostumer.aggregate([
      { $unwind: "$serviceList" },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m", date: "$serviceList.startdate" },
          },
          total: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    return res.status(200).json(ApiResponse.success(`Select reservations by month `,result));
  } catch (error) {
    return res.status(500).json(ApiResponse.error(`Eroor 500  `,[{ message: 
      error.message
    }]));
  }
});

router.get("/reservations/day", async (req, res) => {
  try {
    const result = await serviceCostumer.aggregate([
      { $unwind: "$serviceList" },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$serviceList.startdate" },
          },
          total: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    return res.status(200).json(ApiResponse.success(`Select reservations by day `,result));
  } catch (error) {
    return res.status(500).json(ApiResponse.error(`Eroor 500  `,[{ message: 
      error.message
    }]));
  }
});

router.get("/average-time", async (req, res) => {
  try {
    const result = await serviceCostumer.aggregate([
      { $unwind: "$serviceList" },
      { $match: { "serviceList.idmechanic": { $ne: null } } },
      {
        $group: {
          _id: "$serviceList.idmechanic",
          totalTime: { $sum: "$serviceList.service.time" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          mechanicId: "$_id",
          averageTime: { $divide: ["$totalTime", "$count"] },
        },
      },
      {
        $lookup: {
          from: "emps", // nom de la collection MongoDB des employés
          localField: "mechanicId",
          foreignField: "_id",
          as: "mechanicInfo",
        },
      },
      {
        $unwind: "$mechanicInfo",
      },
      {
        $project: {
          mechanicId: 1,
          averageTime: 1,
          name: "$mechanicInfo.name",
          firstname: "$mechanicInfo.firstName",
          picture: "$mechanicInfo.picture",
        },
      }
    ]);
    return res.status(200).json(ApiResponse.success(`Select avarage time with average-time `,result));
  } catch (error) {
    return res.status(500).json(ApiResponse.error(`Eroor 500  `,[{ message: 
      error.message
    }]));
  }
});

router.put("/facture/:id", async (req, res) => {
  try {
   
    const serviceCostumerById = await serviceCostumer
      .findById(req.params.id)
      .populate(
        "idcostumer serviceList.idmechanic serviceList.service.idservice"
      );
    if (!serviceCostumerById) {
      return res.status(404).json(ApiResponse.error(`Eroor 500  `,[{ message: 
        "Service costumer not found"
      }]));
    }
    if (serviceCostumerById.etats == 1) {
      return res.status(400).json(ApiResponse.error(`Eroor 500  `,[{ message: 
        "Service deleted"
      }]));
    }
    if (serviceCostumerById.etats !== 0) {
      return res.status(404).json(ApiResponse.error(`Eroor 500  `,[{ message: 
        "Service being processedd"
      }]));
    }
    const service = await serviceCostumer.findByIdAndUpdate(req.params.id,req.body, {
          new: true,
    });
   
    const invoice = new InvoiceData(); 
    invoice.client.company = `${serviceCostumerById.idcostumer.name} ${serviceCostumerById.idcostumer.firstName}`;
    invoice.invoiceNumber = serviceCostumerById._id;
    invoice.invoiceDate = new Date();
    invoice.products = serviceCostumerById.serviceList.map((value) => {
      return {
        quantity: 1,
        description: value.service.idservice.name,
        tax: 20,
        price: value.service.price,
      };
    });
    const result = await easyinvoice.createInvoice(invoice);

    sendValidationEmailWithInvoice(
      serviceCostumerById.idcostumer.login,
      `${serviceCostumerById.idcostumer.name} ${serviceCostumerById.idcostumer.firstName}`,
      serviceCostumerById._id,
      Buffer.from(result.pdf, "base64")
    );
    return res.status(201).json(ApiResponse.success(`success`,service));

  } catch (error) {
    return res.status(400).json(ApiResponse.error(`Eroor 500  `,[{ message: 
      error.message
    }]));
  }
});

router.get("/story/:idcostumer", async (req, res) => {
  try {
    const skip = parseInt(req.query.skip) || 0; 
    const limit = parseInt(req.query.limit) || 10;
    const serviceCostumers = await serviceCostumer.find({ idcostumer: req.params.idcostumer })
    .populate(
      "idcostumer serviceList.idmechanic serviceList.service.idservice"
    ).skip(skip)
    .limit(limit);
    return res.status(201).json(ApiResponse.success(`success`,serviceCostumers));
  } catch (error) {
    return res.status(500).json(ApiResponse.error(`Eroor 500  `,[{ message: 
      error.message
    }]));
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
    notifAfterRequestServiceCostumeur();
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
      return res.status(400).json(ApiResponse.error(`Eroor 500  `,[{ message: 
        "Service client no trouver"
      }]));
    }
    // if (serviceCostumerById.etats == 1) {
    //   return res.status(400).json(ApiResponse.error(`Eroor 500  `,[{ message: 
    //     "Service client no trouver"
    //   }]));
    // }
    // if (serviceCostumerById.etats !== 0) {
    //   return res.status(400).json({ error: "Service en cours de traitement." });
    // }
    const service = await serviceCostumer.findByIdAndUpdate(req.params.id,req.body, {
          new: true,
    });
    notifNewTacheMechanic();
    return res.status(201).json(ApiResponse.success(`Modification fait avec succes `,service));

  } catch (error) {
    return res.status(400).json(ApiResponse.error(`Eroor 400  `,[{ message: 
      error.message
    }]));
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
