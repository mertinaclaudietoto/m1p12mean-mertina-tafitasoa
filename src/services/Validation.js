function _undefined(value){
    return value == null || value == undefined;
}
function _same(valueA,valueB){
    return valueA == valueB;
}
function _checkCondition(res,b_userId,b_idrule,userId,idrule,data_idrule){
    if (!_same(idrule, data_idrule)) {
        return res.status(401).json({ message: "You are note authorized to have this link" });
    }
    return null;
}
module.exports = { _undefined, _same ,_checkCondition}; 