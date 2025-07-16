const express = require("express");
const router = express.Router();
const Service = require("../../models/services/service01");
const serviceCar = require("../../models/services/carService");
const authmanager=require("../../midelewares/manager");
const ApiResponse= require('../../models/apiResponse/ApiResponse');
router.get("/ensemble-service-by-car", async (req, res) => {
  try {
    console.log(parseInt(req.query.skip))
    const skip = parseInt(req.query.skip) || 0; 
    const limit = parseInt(req.query.limit) || 10;
    const service = await serviceCar.find()
      .populate({
            path: "servicelist.idservice",
            selct:"name"
      })
      .skip(skip)
      .limit(limit); 
    let new_format =[]
    service.forEach(value => {
      let description = '';
      let price = 0;
      let time = 0;
      value.servicelist.forEach(list => {
        description +=  + list.idservice.name +' '+list.price+' ar ,';
        price += list.price;
        time += list.time;
      })
      new_format.push({
        picture:value.picture,
        _id: value._id, nameofcar: value.brandandmodel,
      description,price,time
      })
    })
    
      res.json(ApiResponse.success(`List of garage service `,new_format));
    } catch (error) {
      return res.status(500).json(ApiResponse.error(`Eroor 500  `,[{ message: 
        error.message
      }]));
    }
});

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
