const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const app = express();
const { clearAndInsertData } = require("./src/data/CLEARANDINSERTDATA");
const { DEFAULTDATA } = require("./src/data/DEFAULTDATA");
const empRoutes = require("./src/routes/emp/Emp");
const ruleRoutes = require("./src/routes/emp/Rule");
const validateMailRoutes = require("./src/routes/email/validate");
const sexRoutes = require("./src/routes/emp/Sex");

const service01Routes = require("./src/routes/service/serice01");
const serviceCarRoutes = require("./src/routes/service/servicecar");
const serviceCostumerRoutes = require("./src/routes/service/serviceCostumer");
const TokenFCMRoutes = require("./src/routes/notification/TokenFCM");


app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connecté");
    clearAndInsertData(DEFAULTDATA);
  })
  .catch((err) => console.log(err));

app.get("/", async (req, res) => {
  console.log("hello heroku");
});
app.use("/api/emps", empRoutes);
app.use("/api/rules", ruleRoutes);
app.use("/api/register", validateMailRoutes);
app.use("/api/sexs", sexRoutes);
app.use("/api/service01", service01Routes);
app.use("/api/servicecars", serviceCarRoutes);
app.use("/api/servicecostumers", serviceCostumerRoutes);
app.use("/api/tokenFCM", TokenFCMRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

