const express = require('express');
const router = express.Router();
const CarType = require('../../models/car/carType');

router.post('/', async (req, res) => {
    try {
        const carTypes = new CarType(req.body);
        await carTypes.save();
        res.status(201).json(carTypes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const carTypes = await CarType.find();
        res.json(carTypes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const carType = await CarType.findByIdAndUpdate(req.params.id,
        req.body, { new: true });
        res.json(carType);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
    // Supprimer un article
router.delete('/:id', async (req, res) => {
    try {
        await CarType.findByIdAndDelete(req.params.id);
        res.json({ message: "Car tyoe delete " });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;