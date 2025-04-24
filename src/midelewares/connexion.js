const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')
const ApiResponse= require('../models/apiResponse/ApiResponse');
const {verifToken} = require('../services/Validation');

module.exports = (req, res, next) => {
  const authorizationHeader =verifToken(req);
  const token = authorizationHeader.split(' ')[1]
  const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
      if(error) {
        res.status(401).json(ApiResponse.error(`Eroor 401  `,[{ message: 
          `The user is not authorized to access this resource.`
          }]));
      }
      const userId = decodedToken.userId
      if (req.body.userId &&  req.body.userId !== userId ) {
          res.status(401).json(ApiResponse.error(`Eroor 401  `,[{ message: 
            `Id of user undefined.`
            }]));
      } 
      else {
          next()
      }
  })
}