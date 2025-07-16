const express = require("express");
const router = express.Router();
const serviceClients = require("../../models/costumer/servicesClient");
const emp = require("../../models/emp/emp");
const { RULE } = require("../../data/RULE");
const auth = require("../../midelewares/manager");
const InvoiceData = require("../../models/costumer/invoice");
const easyinvoice = require("easyinvoice");
const { sendValidationEmailWithInvoice } = require("../../routes/email/mailer");
const service = require("../../models/service");
const Task = require("../../dtos/task");
const carCustomer = require("../../models/costumer/carCostumer");


router.get("/facture-service/:id", async (req, res) => {
  try {
    const invoice = new InvoiceData(); 
    const clientDetails = await serviceClients
      .findById(req.params.id)
      .populate("idcustomer", "name firstName login")
      .populate("idcarcustomer")
      .populate({
        path: "detail.idservice",
        select: "name",
      })
      .populate({
        path: "detail.idmechanic",
        select: "name firstName",
      });

    // Vérifie si clientDetails et ses propriétés existent avant de les utiliser
    if (!clientDetails || !clientDetails.idcustomer) {
      return res.status(404).json({ message: "Client non trouvé" });
    }

    invoice.client.company = `${clientDetails.idcustomer.name} ${clientDetails.idcustomer.firstName}`;
    invoice.invoiceNumber = req.params.id;
    invoice.invoiceDate = new Date();

    invoice.products = clientDetails.detail.map((value) => {
      return {
        quantity: 1,
        description: value.idservice.name,
        tax: 20,
        price: value.prix,
      };
    });

    const result = await easyinvoice.createInvoice(invoice);

    sendValidationEmailWithInvoice(
      clientDetails.idcustomer.login,
      `${clientDetails.idcustomer.name} ${clientDetails.idcustomer.firstName}`,
      req.params.id,
      Buffer.from(result.pdf, "base64")
    );
  } catch (error) {
    // Gestion des erreurs
    res.status(500).json({ message: error.message });
  }
});

router.get("/service-in-progress", async (req, res) => {
  try {
    const values = await serviceClients
      .find({
        $and: [{ "detail.datefin": null }, { datedebut: { $ne: null } }],
      })
      .populate("idcustomer", "name firstName picture")
      .populate("idcarcustomer", "picture brand model")
      .populate({ path: "detail.idservice", select: "name" })
      .populate({
        path: "detail.idmechanic",
        select: "name firstName picture",
      });

    res.json(values);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/service-in-waiting", async (req, res) => {
  try {
    const values = await serviceClients
      .find({
        datedebut: { $eq: null },
      })
      .populate("idcustomer", "name firstName picture")
      .populate("idcarcustomer", "picture brand model")
      .populate({ path: "detail.idservice", select: "name" })
      .populate({
        path: "detail.idmechanic",
        select: "name firstName picture",
      });

    res.json(values);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/free-mechanic", async (req, res) => {
  try {
    const values = await serviceClients.aggregate([
      { $unwind: "$detail" },
      { $match: { "detail.datefin": null } },
      { $group: { _id: "$detail.idmechanic" } },
      { $project: { _id: 1 } },
    ]);
    let mechanic = await emp.find(
      { rule: RULE[2]._id },
      { _id: 1, name: 1, firstName: 1, picture: 1 }
    );
    const set2 = new Set(values.map((item) => item._id.toString()));

    mechanic = mechanic.filter((item) => !set2.has(item._id.toString()));

    res.json(mechanic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const values = new serviceClients(req.body);
    await values.save();
    res.status(201).json(values);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const values = await serviceClients
      .find()
      .populate("idcustomer", "name firstName")
      .populate("idcarcustomer")
      .populate({
        path: "detail.idservice",
        select: "name",
      })
      .populate({
        path: "detail.idmechanic",
        select: "name firstName",
      });
    res.json(values);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id/:skip/:limit", auth, async (req, res) => {
  try {
    const skip = parseInt(req.params.skip, 10) || 0;
    const limit = parseInt(req.params.limit, 10) || 10;
    const values = await serviceClients
      .find()
      .populate("idcustomer", "name firstName")
      .populate("idcarcustomer")
      .populate({
        path: "detail.idservice",
        select: "name",
      })
      .populate({
        path: "detail.idmechanic",
        select: "name firstName",
      })
      .skip(skip)
      .limit(limit);

    res.json(values);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const value = await serviceClients.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(value);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await serviceClients.findByIdAndDelete(req.params.id);
    res.json({ message: "value  delete " });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/task-detail/:id", async (req, res) => {
  try {
    const serviceCustomer = await serviceClients.findOne({
      "detail._id": req.params.id,
    });
    if (!serviceCustomer) {
      return res.status(404).json({ message: "Détail non trouvé" });
    }
    const car = await carCustomer.findById(serviceCustomer.idcarcustomer);
    const taskDetail = serviceCustomer.detail.find(
      (d) => d._id.toString() === req.params.id
    );
    if (!taskDetail) {
      return res.status(404).json({ message: "Détail non trouvé" });
    }
    const getService = await service.findById(taskDetail.idservice);
    const mechanic = await emp.findById(taskDetail.idmechanic);
    const task = new Task(
      taskDetail._id,
      getService,
      mechanic,
      car,
      taskDetail.prix,
      taskDetail.datedebut,
      taskDetail.datefin,
      taskDetail.is_finished
    );
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/task/:mechanicId", async (req, res) => {
  try {
    const idMechanic = req.params.mechanicId;
    const tasks = await serviceClients.find({
      "detail.idmechanic": idMechanic,
    });
    const details = await Promise.all(
      tasks.map(async (task) => {
        const car = await carCustomer.findById(task.idcarcustomer);
        const filteredDetails = task.detail
          .filter(
            (d) => d.idmechanic.equals(idMechanic) && d.is_finished === false
          )
          .map(async (d) => {
            const getService = await service.findById(d.idservice);
            const mechanic = await emp.findById(d.idmechanic);
            return new Task(
              d._id,
              getService,
              mechanic,
              car,
              d.prix,
              d.datedebut,
              d.datefin,
              d.is_finished
            );
          });
        return await Promise.all(filteredDetails);
      })
    );
    const flatDetails = details.flat();
    res.json(flatDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/task-start/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const now = new Date();
    const serviceClient = await serviceClients.findOne({
      "detail._id": taskId,
    });
    if (!serviceClient) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }
    serviceClient.detail.forEach((d) => {
      if (d._id.equals(taskId)) {
        d.datedebut = now;
      }
    });
    await serviceClient.save();
    res.json({ message: "Service démarré avec succès", updatedAt: now });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/task-finish/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const now = new Date();
    const serviceClient = await serviceClients.findOne({
      "detail._id": taskId,
    });
    if (!serviceClient) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }
    serviceClient.detail.forEach((d) => {
      if (d._id.equals(taskId)) {
        d.datefin = now;
        d.is_finished = true;
      }
    });
    await serviceClient.save();
    res.json({ message: "Service términé avec succès", updatedAt: now });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/task-today/:mechanicId", async (req, res) => {
  try {
    const idMechanic = req.params.mechanicId;
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    const tasks = await serviceClients.find({
      "detail.idmechanic": idMechanic,
    });
    const details = await Promise.all(
      tasks.map(async (task) => {
        const car = await carCustomer.findById(task.idcarcustomer);
        const filteredDetails = task.detail
          .filter(
            (d) =>
              d.idmechanic.equals(idMechanic) &&
              d.is_finished === true &&
              d.datedebut &&
              (new Date(d.datedebut) >= startOfDay ||
                new Date(d.datedebut) <= endOfDay)
          )
          .map(async (d) => {
            const getService = await service.findById(d.idservice);
            const mechanic = await emp.findById(d.idmechanic);
            return new Task(
              d._id,
              getService,
              mechanic,
              car,
              d.prix,
              d.datedebut,
              d.datefin,
              d.is_finished
            );
          });
        return await Promise.all(filteredDetails);
      })
    );
    res.json(details.flat());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/all-task-mechanic/:mechanicId", async (req, res) => {
  try {
    const idMechanic = req.params.mechanicId;
    const tasks = await serviceClients.find({
      "detail.idmechanic": idMechanic,
    });
    const details = await Promise.all(
      tasks.map(async (task) => {
        const car = await carCustomer.findById(task.idcarcustomer);
        const filteredDetails = task.detail
          .filter((d) => d.idmechanic.equals(idMechanic))
          .map(async (d) => {
            const getService = await service.findById(d.idservice);
            const mechanic = await emp.findById(d.idmechanic);
            return new Task(
              d._id,
              getService,
              mechanic,
              car,
              d.prix,
              d.datedebut,
              d.datefin,
              d.is_finished
            );
          });
        return await Promise.all(filteredDetails);
      })
    );
    const flatDetails = details.flat();
    res.json(flatDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
