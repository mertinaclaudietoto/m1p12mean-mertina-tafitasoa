const CarType = require("../models/carType");
const engineTypes = require("../models/engineType");
const sizeTypes = require("../models/sizeType");
const weigthTypes = require("../models/weigthType");
const bcrypt = require("bcrypt");

const { Types } = require("mongoose");
const Rule = require("../models/emp/rule");
const DEFAULTDATA = [
  {
    model: CarType,
    data: [
      { name: "Berline", percentage: 100 },
      { name: "Break", percentage: 95 },
      { name: "Coupé", percentage: 80 },
      { name: "Cabriolet", percentage: 75 },
      { name: "Hatchback", percentage: 92 },
      { name: "Limousine", percentage: 93 },
      { name: "SUV", percentage: 94 },
      { name: "Crossover", percentage: 97 },
      { name: "Pick-up", percentage: 98 },
      { name: "Monospace", percentage: 91 },
    ],
  },
  {
    model: engineTypes,
    data: [
      { name: "Essence", percentage: 91 },
      { name: "Diesel", percentage: 95 },
      { name: "Hybride Série", percentage: 88 },
      { name: "Hybride Parallèle", percentage: 93 },
      { name: "Hybride Plug-in", percentage: 83 },
      { name: "Électrique CC", percentage: 84 },
      { name: "Électrique Synchrone", percentage: 85 },
      { name: "Électrique Asynchrone", percentage: 86 },
      { name: "Hydrogène", percentage: 96 },
      { name: "Rotatif", percentage: 100 },
      { name: "Gaz Naturel", percentage: 78 },
      { name: "Biocarburant", percentage: 79 },
    ],
  },
  {
    model: sizeTypes,
    data: [
      { name: "Petite", percentage: 80 },
      { name: "Moyenne", percentage: 78 },
      { name: "Grande", percentage: 77 },
    ],
  },
  {
    model: weigthTypes,
    data: [
      { name: "Légère", percentage: 93 },
      { name: "Moyenne", percentage: 89 },
      { name: "Lourde", percentage: 90 },
    ],
  },
  {
    model: Rule,
    data: [
      { _id: new Types.ObjectId("000000000000000000000001"), name: "Manager" },
      { _id: new Types.ObjectId("000000000000000000000002"), name: "Customer" },
      { _id: new Types.ObjectId("000000000000000000000003"), name: "Mechanic" },
    ],
  },
];

module.exports = { DEFAULTDATA };
