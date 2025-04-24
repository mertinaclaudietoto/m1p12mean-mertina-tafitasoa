const { Types } = require('mongoose'); 
const RULE = {
    manager:new Types.ObjectId("000000000000000000000001"),
    costumer:new Types.ObjectId("000000000000000000000002"),
    mechanic:new Types.ObjectId("000000000000000000000003")
}
module.exports = { RULE };

