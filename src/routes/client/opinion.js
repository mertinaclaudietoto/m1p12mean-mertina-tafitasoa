const express = require("express");
const router = express.Router();
const opinion = require("../../models/costumer/opinion");
const ApiResponse = require('../../models/apiResponse/ApiResponse');

router.post("/", async (req, res) => {
  try {
    const values = new opinion(req.body);
    await values.save();
    // res.status(201).json(values);
    res.json(ApiResponse.success(`Avis enregister`,values));
  } catch (error) {
    res.status(500).json(ApiResponse.error(`Eroor 500  `,[{ message: error.message }]));
  }
});

router.get("/", async (req, res) => {
    try {
        const skip = parseInt(req.query.skip, 10) || 0;
        const limit = parseInt(req.query.limit, 10) || 10;
        const values = await opinion.find()
                                    .populate({
                                        path: 'costumer',
                                        select: 'name firstName picture',
                                    })
                                    .skip(skip)
                                    .limit(limit);   
        let resulta = [];
        values.forEach(value => {
            resulta.push({
                _id: value.costumer._id,
                name:  value.costumer.name,
                firstname: value.costumer.firstName,
                picture:  value.costumer.picture,
                message:value.message,
                date:value.date
            })
        })
        res.json(ApiResponse.success(`Select options `,resulta ));
    } catch (error) {
        res.status(500).json(ApiResponse.error(`Eroor 500  `,[{ message: error.message }]));
    }
});

router.put('/:id', async (req, res) => {
    try {
        const values = await opinion.findByIdAndUpdate(req.params.id,
        req.body, { new: true });
        res.json(ApiResponse.success(`Update with success ${req.params.id}  `,values));
    } catch (error) {
        res.status(500).json(ApiResponse.error(`Eroor 500  `,[{ message: error.message }]));
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await opinion.findByIdAndDelete(req.params.id);
        res.json(ApiResponse.success(`Delete with success  `,{}));
    } catch (error) {
        res.status(500).json(ApiResponse.error(`Eroor 500  `,[{ message: error.message }]));
    }
});

module.exports = router;