const { Types } = require('mongoose');  // Assurez-vous d'importer Types de mongoose

const RULEDATA = [
    { _id: new Types.ObjectId("000000000000000000000001"), name: "Manager" },
    { _id: new Types.ObjectId("000000000000000000000002"), name: "Customer" },
    { _id: new Types.ObjectId("000000000000000000000003"), name: "Mechanic" },
];
module.exports = { RULEDATA };