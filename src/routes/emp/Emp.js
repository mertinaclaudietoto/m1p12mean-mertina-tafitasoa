const express = require('express');
const router = express.Router();
const Emp=require('../../models/emp/emp');
const bcrypt = require('bcrypt')
const jwt=require("jsonwebtoken");
const privateKey = require('../../auth/private_key');
const hasPassword = require('../../midelewares/hashpassword');
const { Types } = require('mongoose');  
const {sendLogin}=require('../../routes/email/mailer')
const ApiResponse= require('../../models/apiResponse/ApiResponse')
router.get('/findbyrule/:id', async (req, res) => {
    try {
        const values = await Emp.find({rule:new Types.ObjectId(req.params.id)})
        res.json(ApiResponse.success(`Emp whith rule  ${req.params.id}`,values));
    } catch (error) {
        res.status(500).json(ApiResponse.error(`Eroor 500  `,[{ message: error.message }]));
    }
});

router.get('/listbyrule/:id', async (req, res) => {
    try {
        const values = await Emp.find({rule:new Types.ObjectId(req.params.id)})
        res.json(ApiResponse.success(`Numbers of costumers `,values));
    } catch (error) {
        res.status(500).json(ApiResponse.error(`Eroor 500  `,[{ message: error.message }]));
    }
});

router.get('/nbrcostumers/:id', async (req, res) => {
    try {
        const values = await Emp.countDocuments({rule:new Types.ObjectId(req.params.id)})
        res.json(ApiResponse.success(`Numbers of costumers `,values));
    } catch (error) {
        res.status(500).json(ApiResponse.error(`Eroor 500  `,[{ message: error.message }]));
    }
});

router.post('/',hasPassword, async (req, res) => {
    
    try {
        const values = new Emp(req.body);
        await values.save();
        sendLogin(req.body.login,req.body.login,req.body.password1);
        res.json(ApiResponse.success(`Employe add whith succes `,values));
    } catch (error) {
        res.status(500).json(ApiResponse.error(`Eroor 500  `,[{ message: error.message }]));
    }

});

router.get('/', async (req, res) => {
    try {
        const values = await Emp.find();          
        res.json(ApiResponse.success(`Select Employe  `,values));
    } catch (error) {
        res.status(500).json(ApiResponse.error(`Eroor 500  `,[{ message: error.message }]));
    }
});

router.get('/:id', async (req, res) => {
    try {
        const values = await Emp.findById(req.params.id)
        res.json(ApiResponse.success(`Select Employe width id ${req.params.id}  `,values));
    } catch (error) {
        res.status(500).json(ApiResponse.error(`Eroor 500  `,[{ message: error.message }]));
    }
});

router.put('/:id', async (req, res) => {
    try {
        const values = await Emp.findByIdAndUpdate(req.params.id,
        req.body, { new: true });
        res.json(ApiResponse.success(`Update with success ${req.params.id}  `,values));
    } catch (error) {
        res.status(500).json(ApiResponse.error(`Eroor 500  `,[{ message: error.message }]));
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Emp.findByIdAndDelete(req.params.id);
        res.json(ApiResponse.success(`Delete with success  `,{}));
    } catch (error) {
        res.status(500).json(ApiResponse.error(`Eroor 500  `,[{ message: error.message }]));
    }
});
router.post('/login',async (req, res) => {
    Emp.findOne({ login: req.body.login }).then(user => {
        // console.log(user)
        if(!user){
            const message= "User not found";
            return res.status(400).json({ message,column:0 })
        }
        if(user.active==0){
           return res.status(500).json(ApiResponse.error(`Eroor 500  `,[{ message: 'connexion not authorized' }]));
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
            return res.json(ApiResponse.success(`Login success  `,{picture: user.picture,iduser:user._id,idrule:user.rule._id,token }));
        }
      })
    })
})

module.exports = router;