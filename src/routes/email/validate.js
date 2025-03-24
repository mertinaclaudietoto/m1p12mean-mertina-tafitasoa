const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Emp=require('../../models/emp/emp');
const { Types } = require('mongoose');
const jwt=require("jsonwebtoken");
const privateKey = require('../../auth/private_key');
const sendValidationEmail=require('./mailer');

router.post('/',async (req, res) => {
   const token = jwt.sign( {...req.body},privateKey,{expiresIn:'24h'});
   sendValidationEmail(req.body.login,token);
   return res.status(200).json({ message:"Thanks for register please check you email validation." })
});
router.get('/',async (req, res) => {
  const { token } = req.query;
  let emp={sex:'',name:'',firstName:'',dateofbirth:'',login:'',password:'',rule:new Types.ObjectId("000000000000000000000002")};
 const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
         if(error) {
             const message = `email no valide`
             return res.status(401).json({ message, data: error })
         }
         emp.name=decodedToken.name;
         emp.sex=decodedToken.sex;
         emp.firstName=decodedToken.firstName;
         emp.dateofbirth=decodedToken.dateofbirth;
         emp.login=decodedToken.login;
         emp.password=decodedToken.password;
     })
    try {
        emp.password = await bcrypt.hash(emp.password, 10);
        console.log(emp)
        const values = new Emp(emp);
        await values.save();
        res.status(200).send(`
            <html>
              <head><title>Succès</title></head>
              <body>
                <h1>Inscription réussie !</h1>
                <p>Merci d'avoir validé votre compte.</p>
                <a href="${process.env.LINK_CON_FRONT}">Voici le lien pour vous conecter</a>
              </body>
            </html>
          `);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;