const express = require('express');
const router = express.Router();
const serviceClients=require('../../models/client/servicesClient');
const emp=require('../../models/emp/emp');
const {RULE}=require('../../data/RULE');
const auth= require('../../midelewares/costumer')
const { Types } = require('mongoose');


router.get('/service-in-progress', async (req, res) => {
    try {
        const values = await serviceClients.find({
            $and: [
                { "detail.datefin": null }, 
                { "datedebut": { $ne: null } } 
            ]
        })
        .populate("idcustomer", "name firstName picture") 
        .populate("idcarcustomer", "picture brand model")
        .populate({ path: "detail.idservice", select: "name" }) 
        .populate({ path: "detail.idmechanic", select: "name firstName picture" }) ;

        res.json(values);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/service-in-waiting', async (req, res) => {
    try {
        const values = await serviceClients.find({
            "datedebut": { $eq: null }
        })
        .populate("idcustomer", "name firstName picture") 
        .populate("idcarcustomer", "picture brand model")
        .populate({ path: "detail.idservice", select: "name" }) 
        .populate({ path: "detail.idmechanic", select: "name firstName picture" }) ;

        res.json(values);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/free-mechanic', async (req, res) => {
    try {
        const values = await serviceClients.aggregate([
            { $unwind: "$detail" }, 
            { $match: { "detail.datefin": null } }, 
            { $group: { _id: "$detail.idmechanic" } }, 
            { $project: { _id: 1 } } 
          ]);
        let mechanic = await emp.find(
            { rule:RULE[2]._id }, 
            { _id: 1, name: 1, firstName: 1, picture: 1 } 
        );
        const set2 = new Set(values.map(item => item._id.toString())); 
        
        mechanic = mechanic.filter(item => !set2.has(item._id.toString()));
        
        res.json(mechanic);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/',async (req, res) => {
    try {
        const values = new serviceClients(req.body);
        await values.save();
        res.status(201).json(values);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const values = await serviceClients.find()
            .populate("idcustomer","name firstName") 
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
router.get('/:id/:skip/:limit',auth, async (req, res) => {
    try {
        const skip = parseInt(req.params.skip, 10) || 0;
        const limit = parseInt(req.params.limit, 10) || 10;
        const values = await serviceClients.find()
            .populate("idcustomer","name firstName") 
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


router.put('/:id',auth, async (req, res) => {
    try {
        const value = await Empcar.findByIdAndUpdate(req.params.id,
        req.body, { new: true });
        res.json(value);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id',auth, async (req, res) => {
    try {
        await Empcar.findByIdAndDelete(req.params.id);
        res.json({ message: "value  delete " });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
