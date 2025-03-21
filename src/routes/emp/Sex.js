const express = require('express');
const router = express.Router();
const Emp=require('../../models/emp/sex');


router.post('/', async (req, res) => {
    try {
        const values = new Emp(req.body);
        await values.save();
        res.status(201).json(values);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const values = await Emp.find() 
        res.json(values);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const value = await Emp.findByIdAndUpdate(req.params.id,
        req.body, { new: true });
        res.json(value);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Emp.findByIdAndDelete(req.params.id);
        res.json({ message: "value type delete " });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;