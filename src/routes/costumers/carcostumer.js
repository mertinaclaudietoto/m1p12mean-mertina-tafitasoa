const express = require('express');
const router = express.Router();
const Emp=require('../../models/costumers/carCostumer');
const auth= require('../../midelewares/costumer')

router.post('/',auth,async (req, res) => {
    try {
        const values = new Emp(req.body);
        await values.save();
        res.status(201).json(values);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/',auth, async (req, res) => {
    try {
        const values = await Emp.find()
                                .populate('carType')      
                                .populate('engineType')    
                                .populate('sizeType')      
                                .populate('weigthType')
                                .populate('costumer')
        res.json(values);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/:id/:skip/:limit',auth, async (req, res) => {
    try {
        const skip = parseInt(req.params.skip, 10) || 0;
        const limit = parseInt(req.params.limit, 10) || 10;
        const values = await Emp.find({costumer:req.params.id})
                            .populate('carType')      
                            .populate('engineType')    
                            .populate('sizeType')      
                            .populate('weigthType')
                            .populate('costumer')
                            .skip(skip)
                            .limit(limit);
        res.json(values);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.put('/:id',auth, async (req, res) => {
    try {
        const value = await Emp.findByIdAndUpdate(req.params.id,
        req.body, { new: true });
        res.json(value);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id',auth, async (req, res) => {
    try {
        await Emp.findByIdAndDelete(req.params.id);
        res.json({ message: "value tyoe delete " });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/rows/:id',auth, async (req, res) => {
    try {
        const service = await Emp.find({costumer:req.params.id})
        .countDocuments();     
        res.json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;


