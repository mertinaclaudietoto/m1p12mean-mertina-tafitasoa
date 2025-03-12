const express = require('express');
const router = express.Router();
const Service = require('../../models/service/servicePrice');

router.post('/', async (req, res) => {
    try {
        const service = new Service(req.body);
        await service.save();
        res.status(201).json(service);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const service = await Service.find()
        .populate('car')      
        .populate('service')    ;
        res.json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id,
        req.body, { new: true });
        res.json(service);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
    // Supprimer un article
router.delete('/:id', async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.json({ message: "Car tyoe delete " });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;