const express = require('express');
const router = express.Router();
const weigthType = require('../../models/car/weigthType');

router.post('/', async (req, res) => {
    try {
        const weigthTypes = new weigthType(req.body);
        await weigthTypes.save();
        res.status(201).json(weigthTypes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const weigthTypes = await weigthType.find();
        res.json(weigthTypes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const weigthType = await weigthType.findByIdAndUpdate(req.params.id,
        req.body, { new: true });
        res.json(weigthType);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
    // Supprimer un article
router.delete('/:id', async (req, res) => {
    try {
        await weigthType.findByIdAndDelete(req.params.id);
        res.json({ message: "Car tyoe delete " });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;