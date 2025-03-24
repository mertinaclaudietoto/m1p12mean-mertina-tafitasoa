function _undefined(value){
    return value == null || value == undefined;
}
function _same(valueA,valueB){
    return valueA == valueB;
}
function _checkCondition(res,b_userId,b_idrule,userId,idrule,data_idrule){
    // if (_undefined(b_userId)) {
    //     return res.status(401).json({ message: "Id of user undefined." });
    // }
    // if (_undefined(b_idrule)) {
    //     return res.status(401).json({ message: "IdRule of user undefined." });
    // }
    // if (!_same(b_userId,userId)) {
    //     return res.status(401).json({ message: "Iduser token different of iduser send" });
    // }
    // if (!_same(b_idrule,idrule)) {
    //     return res.status(401).json({ message: "Idrule token different of idrule send" });
    // }
    if (!_same(idrule,data_idrule)) {
        return res.status(401).json({ message: "You are note authorized to have this link" });
    }
    return null;
}
module.exports = { _undefined, _same ,_checkCondition}; 