const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')
const { RULEDATA } = require('../data/RULE');
const {_checkCondition} = require('../services/Validation');
module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization
  
    if(!authorizationHeader) {
        const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`
        return res.status(401).json({ message })
    }
    const token = authorizationHeader.split(' ')[1]
    const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
        if(error) {
        const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`
        return res.status(401).json({ message, data: error })
        }
        const userId = decodedToken.userId
        const idrule = decodedToken.idrule;
        let value= _checkCondition(res,req.body.userId,req.body.idrule,userId,idrule,RULEDATA[1]._id);
        if(value!=null){
            return value;
        }
        next();
    })
}