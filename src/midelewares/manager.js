const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')
const {RULE } = require('../data/RULE');
const {_checkCondition,verifToken} = require('../services/Validation');
const ApiResponse= require('../models/apiResponse/ApiResponse');

module.exports = (req, res, next) => {
    const authorizationHeader =verifToken(req);
    const token = authorizationHeader.split(' ')[1]
    const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
        if(error) {
            return res.status(401).json(ApiResponse.error(`Eroor 401  `,[{ message: 
                `The user is not authorized to access this resource.`
                }]));
        }
        const idrule = decodedToken.idrule;
        let value= _checkCondition(res,idrule,RULE.manager.toString());
        if(value!=null){
            return value;
        }
        next();
    })
}