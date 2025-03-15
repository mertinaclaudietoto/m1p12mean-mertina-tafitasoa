const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
require('dotenv').config(); 
const cors = require('cors');
const app = express();
// router
const { clearAndInsertData } = require('./src/data/ClearAndInsert');
const { DEFAULTDATA }  = require('./src/data/defaultData');


const carTypeRoutes = require('./src/routes/car/carTypes');
const engineTypeRoutes =  require('./src/routes/car/engineTypes');
const sizeTypeRoutes =  require('./src/routes/car/sizeTypes');
const weigthTypeRoutes =  require('./src/routes/car/weightTypes');
const carRoutes =  require('./src/routes/car/car');
const serviceRoutes =  require('./src/routes/service/service');
const servicePriceRoutes =  require('./src/routes/service/servicePrice');
const empRoutes = require('./src/routes/emp/Emp');
const ruleRoutes = require('./src/routes/emp/Rule');


app
.use(bodyParser.json())
app.use(cors({
  origin: '*',  // Ou l'URL de ton frontend ex: 'http://localhost:4200'
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connecté")
        // clearAndInsertData(DEFAULTDATA);
    })
    .catch(err => console.log(err))
app.get('/', async (req, res) => {
  console.log("hello heroku")
  });
app.use('/api/cartypes', carTypeRoutes);
app.use('/api/engines', engineTypeRoutes);
app.use('/api/sizes', sizeTypeRoutes);
app.use('/api/weigths', weigthTypeRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/serviceprices', servicePriceRoutes);
app.use('/api/emps',empRoutes);
app.use('/api/rules',ruleRoutes);






const PORT = process.env.PORT || 3000;  // Vérifie si une variable d'environnement est définie, sinon utilise 3000
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});