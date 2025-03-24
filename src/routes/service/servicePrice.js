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

router.get('/:skip/:limit', async (req, res) => {
    const skip = parseInt(req.params.skip, 10) || 0;
    const limit = parseInt(req.params.limit, 10) || 10;
    try {
        const service = await Service.find()
        .populate({
            path: 'car', 
            populate: [
                { path: 'carType' },   
                { path: 'engineType' }, 
                { path: 'sizeType' },   
                { path: 'weigthType' }  
            ]
        })     
        .populate('service')
        .skip(skip)
        .limit(limit);
        res.json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/rows', async (req, res) => {
    try {
        const service = await Service.find()
        .countDocuments();     
        res.json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:skip/:limit', async (req, res) => {
    try {
        const skip = parseInt(req.params.skip, 10) || 0;
        const limit = parseInt(req.params.limit, 10) || 10;
        const service = await Service.find()
        .populate({
            path: 'car', 
            populate: [
                { path: 'carType' },   
                { path: 'engineType' }, 
                { path: 'sizeType' },   
                { path: 'weigthType' }  
            ]
        })     
        .populate('service')
        .skip(skip)
        .limit(limit);
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