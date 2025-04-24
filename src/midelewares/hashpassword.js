const bcrypt = require('bcrypt');
const ApiResponse= require('../models/apiResponse/ApiResponse');

const hashPasswordMiddleware = async (req, res, next) => {
  try {
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password1 = req.body.password;
      req.body.password = hashedPassword;
    }
    next();
  } catch (err) {
    return res.status(500).json(ApiResponse.error(`Eroor 500  `,[{ message: 
      `Error hashing password`
    }]));
  }
};
module.exports = hashPasswordMiddleware;
