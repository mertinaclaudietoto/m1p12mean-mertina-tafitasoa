const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const app = express();
// router
const { clearAndInsertData } = require("./src/data/ClearAndInsert");
const { DEFAULTDATA } = require("./src/data/defaultData");


const carTypeRoutes = require('./src/routes/carTypes');
const engineTypeRoutes =  require('./src/routes/engineTypes');
const sizeTypeRoutes =  require('./src/routes/sizeTypes');
const weigthTypeRoutes =  require('./src/routes/weightTypes');
const serviceRoutes =  require('./src/routes/service');
const empRoutes = require('./src/routes/emp/Emp');
const ruleRoutes = require('./src/routes/emp/Rule');
const validateMailRoutes = require('./src/routes/email/validate');
const sexRoutes = require('./src/routes/emp/Sex');
const carCostumerRoutes = require('./src/routes/carcostumer');
const serviceClientRoutes = require('./src/routes/client/serviceClients');


const bcrypt = require("bcrypt");

app
.use(bodyParser.json())
app.use(cors({
  origin: '*',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connecté")
        // clearAndInsertData(DEFAULTDATA);
    })
    .catch(err => console.log(err))

app.get('/', async (req, res) => { console.log("hello heroku") });

app.use('/api/cartypes', carTypeRoutes);
app.use('/api/engines', engineTypeRoutes);
app.use('/api/sizes', sizeTypeRoutes);
app.use('/api/weigths', weigthTypeRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/emps',empRoutes);
app.use('/api/rules',ruleRoutes);
app.use('/api/register',validateMailRoutes);
app.use('/api/sexs',sexRoutes);
app.use('/api/car-costumers',carCostumerRoutes);
app.use('/api/services-client',serviceClientRoutes);






const PORT = process.env.PORT || 3000; // Vérifie si une variable d'environnement est définie, sinon utilise 3000
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
