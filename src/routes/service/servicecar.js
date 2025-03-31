const express = require("express");
const router = express.Router();
const Service = require("../../models/services/service01");
const serviceCar = require("../../models/services/carService");
const authmanager=require("../../midelewares/manager");


router.get("/rows/", async (req, res) => {
    try {
     const service = await serviceCar.countDocuments();                            
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
router.get("/pagination/", async (req, res) => {
    try {
    const skip = parseInt(req.query.skip) || 0; 
    const limit = parseInt(req.query.limit) || 10;
    const service = await serviceCar.find()
                                      .populate({
                                          path: "servicelist.idservice",
                                          select: "name",
                                      }).skip(skip)
                                      .limit(limit);
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.get("/search/", async (req, res) => {
    try {
        const { brandandmodel } = req.query;
        if (!brandandmodel) {
            return res.status(400).json({ message: "brandandmodel est requis" });
        }
        const service = await serviceCar.find({brandandmodel: { $regex: brandandmodel, $options: "i" }})
                                        .populate({
                                            path: "servicelist.idservice",
                                            select: "name",
                                        });
        res.json(service);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

router.post("/",authmanager, async (req, res) => {
  try {
    const service = new serviceCar(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const service = await serviceCar.find()
                                    .populate({
                                        path: "servicelist.idservice",
                                        select: "name",
                                    });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id",authmanager, async (req, res) => {
  try {
    const service = await serviceCar.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.delete("/:id",authmanager, async (req, res) => {
    
  try {
    await serviceCar.findByIdAndDelete(req.params.id);
    console.log(req.params.id)
    res.json({ message: "Service delete with sucess " });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
