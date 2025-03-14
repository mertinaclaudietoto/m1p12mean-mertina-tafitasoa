const express = require('express');
const router = express.Router();
const car = require('../../models/car/car');
const CarType = require('../../models/car/carType');
const EngineType = require('../../models/car/engineType');
const SizeType = require('../../models/car/sizeType');
const WeightType = require('../../models/car/weightType');


router.post('/', async (req, res) => {
    try {
        const cars = new car(req.body);
        await cars.save();
        res.status(201).json(cars);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        console.log("hdueude")
        const cars = await car.find()
            .populate('carType')      
            .populate('engineType')    
            .populate('sizeType')      
            .populate('weightType')   
        console.log(cars);
        res.json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const car = await car.findByIdAndUpdate(req.params.id,
        req.body, { new: true });
        res.json(car);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        await car.findByIdAndDelete(req.params.id);
        res.json({ message: "Car tyoe delete " });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;