const express = require('express');
const router = express.Router();
const Emp=require('../../models/emp/emp');
const bcrypt = require('bcrypt')
const jwt=require("jsonwebtoken");
const privateKey = require('../../auth/private_key');
const hasPassword = require('../../midelewares/hashpassword');
const { Types } = require('mongoose');  

router.get('/nbrcostumers/:id', async (req, res) => {
    try {
        const values = await Emp.countDocuments({rule:new Types.ObjectId(req.params.id)})
        res.json(values);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post('/',hasPassword, async (req, res) => {
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
        .populate('skills')   
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
        res.json({ message: "value tyoe delete " });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post('/login',async (req, res) => {
    Emp.findOne({ login: req.body.login }).then(user => {
        // console.log(user)
        if(!user){
            const message= "User not found";
            return res.status(400).json({ message,column:0 })
        }
      bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
        if(!isPasswordValid){
            const message= "False passWord";
            return res.status(400).json({ message,column:1 })
        }
        const token = jwt.sign(
            {userId:user._id,idrule:user.rule._id},
            privateKey,
            {expiresIn:'24h'}
        )
        if(isPasswordValid) {
          const message = `L'utilisateur a été connecté avec succès`;
          return res.json({ message, picture: user.picture,iduser:user._id,idrule:user.rule._id,token })
        }
      })
    })
})

  

module.exports = router;