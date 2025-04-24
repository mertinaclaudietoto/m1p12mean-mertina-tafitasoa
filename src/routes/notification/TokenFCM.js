const express = require('express');
const router = express.Router();
const tokenFCM=require('../../models/notification/tokenFCM');
const { notifAfterRequestServiceCostumeur } = require('./../notification/sendNotificationToAll');
router.post('/', async (req, res) => {
    try {
        const values = new tokenFCM(req.body);
        await values.save();
        res.status(201).json(values);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.get('/', async (req, res) => {
    notifAfterRequestServiceCostumeur();
    try {
        const values = await tokenFCM.find() 
        res.json(values);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;
