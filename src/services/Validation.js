const ApiResponse= require('../models/apiResponse/ApiResponse');
function _undefined(value){
    return value == null || value == undefined;
}
function _same(valueA,valueB){
    return valueA == valueB;
}
function _checkCondition(res,idrule,dataRULE){
    if (!_same(idrule, dataRULE)) {
        return res.status(401).json(ApiResponse.error(`Eroor 401  `,[{ message: 
            `The user is not authorized to access this link.`
            }]));
    }
    return null;
}
function verifToken(req){
    const authorizationHeader = req.headers.authorization
    if(!authorizationHeader) {
        return res.status(401).json(ApiResponse.error(`Eroor 401  `,[{ message: 
            `You haven't provided an authentication token. Add one in the request header.`
            }]));
    }
    return authorizationHeader;
}

module.exports = { _undefined, _same ,_checkCondition,verifToken}; 