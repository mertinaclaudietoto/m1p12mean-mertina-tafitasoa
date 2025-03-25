const { Types } = require('mongoose'); 
const RULE = [
    { _id: new Types.ObjectId("000000000000000000000001"), name: "Manager" },
    { _id: new Types.ObjectId("000000000000000000000002"), name: "Costumer" },
    { _id: new Types.ObjectId("000000000000000000000003"), name: "Mechanic" },
];
module.exports = { RULE };