const CarType = require("../models/car/carType");
const engineTypes = require("../models/car/engineType");
const sizeTypes = require("../models/car/sizeType");
const weightTypes = require("../models/car/weightType");
const car = require("../models/car/car");
const service = require("../models/service/service");
const servicePrice = require("../models/service/servicePrice");



const { Types } = require('mongoose');  // Assurez-vous d'importer Types de mongoose

const DEFAULTDATA = [
  { 
    model: CarType, 
    data: [
      { _id: new Types.ObjectId("000000000000000000000001"), name: "Berline" },
      { _id: new Types.ObjectId("000000000000000000000002"), name: "Break" },
      { _id: new Types.ObjectId("000000000000000000000003"), name: "Coupé" },
      { _id: new Types.ObjectId("000000000000000000000004"), name: "Cabriolet" },
      { _id: new Types.ObjectId("000000000000000000000005"), name: "Hatchback" },
      { _id: new Types.ObjectId("000000000000000000000006"), name: "Roadster" },
      { _id: new Types.ObjectId("000000000000000000000007"), name: "Limousine" },
      { _id: new Types.ObjectId("000000000000000000000008"), name: "SUV" },
      { _id: new Types.ObjectId("000000000000000000000009"), name: "Crossover" },
      { _id: new Types.ObjectId("000000000000000000000010"), name: "4x4" },
      { _id: new Types.ObjectId("000000000000000000000011"), name: "Pick-up" },
      { _id: new Types.ObjectId("000000000000000000000012"), name: "Monospace" },
      { _id: new Types.ObjectId("000000000000000000000013"), name: "Van" },
      { _id: new Types.ObjectId("000000000000000000000014"), name: "Minibus" },
      { _id: new Types.ObjectId("000000000000000000000015"), name: "Camionnette" },
      { _id: new Types.ObjectId("000000000000000000000016"), name: "Camion" },
      { _id: new Types.ObjectId("000000000000000000000017"), name: "Fourgon" }
    ] 
  },
  { 
    model: engineTypes, 
    data: [
      { _id: new Types.ObjectId("000000000000000000000001"), name: "Essence" },
      { _id: new Types.ObjectId("000000000000000000000002"), name: "Diesel" },
      { _id: new Types.ObjectId("000000000000000000000003"), name: "Hybride Série" },
      { _id: new Types.ObjectId("000000000000000000000004"), name: "Hybride Parallèle" },
      { _id: new Types.ObjectId("000000000000000000000005"), name: "Hybride Plug-in" },
      { _id: new Types.ObjectId("000000000000000000000006"), name: "Électrique CC" },
      { _id: new Types.ObjectId("000000000000000000000007"), name: "Électrique Synchrone" },
      { _id: new Types.ObjectId("000000000000000000000008"), name: "Électrique Asynchrone" },
      { _id: new Types.ObjectId("000000000000000000000009"), name: "Hydrogène" },
      { _id: new Types.ObjectId("000000000000000000000010"), name: "Rotatif" },
      { _id: new Types.ObjectId("000000000000000000000011"), name: "Gaz Naturel" },
      { _id: new Types.ObjectId("000000000000000000000012"), name: "Biocarburant" }
    ] 
  },
  { 
    model: sizeTypes, 
    data: [
      { _id: new Types.ObjectId("000000000000000000000001"), name: "Petite" },
      { _id: new Types.ObjectId("000000000000000000000002"), name: "Moyenne" },
      { _id: new Types.ObjectId("000000000000000000000003"), name: "Grande" }
    ] 
  },
  { 
    model: weightTypes, 
    data: [
      { _id: new Types.ObjectId("000000000000000000000001"), name: "Légère" },
      { _id: new Types.ObjectId("000000000000000000000002"), name: "Moyenne" },
      { _id: new Types.ObjectId("000000000000000000000003"), name: "Lourde" }
    ] 
  }, 
  {
      model: service, 
      data: [
          { _id: new Types.ObjectId("000000000000000000000001"), name: "Vidange d'huile" },
          { _id: new Types.ObjectId("000000000000000000000002"), name: "Réparation de freins" },
          { _id: new Types.ObjectId("000000000000000000000003"), name: "Changement de pneus" },
          { _id: new Types.ObjectId("000000000000000000000004"), name: "Diagnostic électronique" },
          { _id: new Types.ObjectId("000000000000000000000005"), name: "Entretien du moteur" },
          { _id: new Types.ObjectId("000000000000000000000006"), name: "Réparation de carrosserie" }
      ]
  },
  // {
  //   model: servicePrice, 
  //   data: [
  //       { _id: new Types.ObjectId("000000000000000000000001"),service:new Types.ObjectId("000000000000000000000001") },
  //       { _id: new Types.ObjectId("000000000000000000000002"), name: "Réparation de freins" },
  //       { _id: new Types.ObjectId("000000000000000000000003"), name: "Changement de pneus" },
  //       { _id: new Types.ObjectId("000000000000000000000004"), name: "Diagnostic électronique" },
  //       { _id: new Types.ObjectId("000000000000000000000005"), name: "Entretien du moteur" },
  //       { _id: new Types.ObjectId("000000000000000000000006"), name: "Réparation de carrosserie" }
  //   ]
  // },
  { 
    model: car, 
    data: [
      {
        picture: "https://example.com/image1.jpg",
        brand: "Toyota",
        model: "Corolla",
        version: "2025",
        datesortie: new Date("2025-01-01"),
        empathement: "AB-123-CD",
        carType: new Types.ObjectId("000000000000000000000001"),  // "Berline"
        engineType: new Types.ObjectId("000000000000000000000001"),  // "Essence"
        sizeType: new Types.ObjectId("000000000000000000000001"),  // "Petite"
        weightType: new Types.ObjectId("000000000000000000000001"),  // "Légère"
      },
      {
        picture: "https://example.com/image2.jpg",
        brand: "Ford",
        model: "Focus",
        version: "2024",
        datesortie: new Date("2024-01-01"),
        empathement: "EF-456-GH",
        carType: new Types.ObjectId("000000000000000000000002"),  // "Break"
        engineType: new Types.ObjectId("000000000000000000000002"),  // "Diesel"
        sizeType: new Types.ObjectId("000000000000000000000002"),  // "Moyenne"
        weightType: new Types.ObjectId("000000000000000000000002"),  // "Moyenne"
      },
      {
        picture: "https://example.com/image3.jpg",
        brand: "BMW",
        model: "X5",
        version: "2023",
        datesortie: new Date("2023-01-01"),
        empathement: "IJ-789-KL",
        carType: new Types.ObjectId("000000000000000000000008"),  // "SUV"
        engineType: new Types.ObjectId("000000000000000000000006"),  // "Électrique CC"
        sizeType: new Types.ObjectId("000000000000000000000003"),  // "Grande"
        weightType: new Types.ObjectId("000000000000000000000003"),  // "Lourde"
      },
      {
        picture: "https://example.com/image4.jpg",
        brand: "Mercedes",
        model: "A-Class",
        version: "2022",
        datesortie: new Date("2022-01-01"),
        empathement: "MN-012-OP",
        carType: new Types.ObjectId("000000000000000000000003"),  // "Coupé"
        engineType: new Types.ObjectId("000000000000000000000004"),  // "Hybride Parallèle"
        sizeType: new Types.ObjectId("000000000000000000000002"),  // "Moyenne"
        weightType: new Types.ObjectId("000000000000000000000001"),  // "Légère"
      },
      {
        picture: "https://example.com/image5.jpg",
        brand: "Audi",
        model: "A6",
        version: "2021",
        datesortie: new Date("2021-01-01"),
        empathement: "QR-345-ST",
        carType: new Types.ObjectId("000000000000000000000004"),  // "Cabriolet"
        engineType: new Types.ObjectId("000000000000000000000005"),  // "Hybride Plug-in"
        sizeType: new Types.ObjectId("000000000000000000000003"),  // "Grande"
        weightType: new Types.ObjectId("000000000000000000000002"),  // "Moyenne"
      },
      {
        picture: "https://example.com/image6.jpg",
        brand: "Nissan",
        model: "Leaf",
        version: "2020",
        datesortie: new Date("2020-01-01"),
        empathement: "UV-678-WX",
        carType: new Types.ObjectId("000000000000000000000008"),  // "SUV"
        engineType: new Types.ObjectId("000000000000000000000007"),  // "Électrique Synchrone"
        sizeType: new Types.ObjectId("000000000000000000000002"),  // "Moyenne"
        weightType: new Types.ObjectId("000000000000000000000003"),  // "Lourde"
      },
      {
        picture: "https://example.com/image7.jpg",
        brand: "Chevrolet",
        model: "Camaro",
        version: "2019",
        datesortie: new Date("2019-01-01"),
        empathement: "YZ-901-AB",
        carType: new Types.ObjectId("000000000000000000000005"),  // "Hatchback"
        engineType: new Types.ObjectId("000000000000000000000003"),  // "Hybride Série"
        sizeType: new Types.ObjectId("000000000000000000000001"),  // "Petite"
        weightType: new Types.ObjectId("000000000000000000000001"),  // "Légère"
      },
      {
        picture: "https://example.com/image8.jpg",
        brand: "Volkswagen",
        model: "Golf",
        version: "2018",
        datesortie: new Date("2018-01-01"),
        empathement: "CD-234-EF",
        carType: new Types.ObjectId("000000000000000000000006"),  // "Roadster"
        engineType: new Types.ObjectId("000000000000000000000002"),  // "Diesel"
        sizeType: new Types.ObjectId("000000000000000000000002"),  // "Moyenne"
        weightType: new Types.ObjectId("000000000000000000000002"),  // "Moyenne"
      },
      {
        picture: "https://example.com/image9.jpg",
        brand: "Porsche",
        model: "911",
        version: "2017",
        datesortie: new Date("2017-01-01"),
        empathement: "GH-567-IJ",
        carType: new Types.ObjectId("000000000000000000000007"),  // "Limousine"
        engineType: new Types.ObjectId("000000000000000000000008"),  // "Électrique Asynchrone"
        sizeType: new Types.ObjectId("000000000000000000000003"),  // "Grande"
        weightType: new Types.ObjectId("000000000000000000000001"),  // "Légère"
      },
      {
        picture: "https://example.com/image10.jpg",
        brand: "Ferrari",
        model: "488 GTB",
        version: "2016",
        datesortie: new Date("2016-01-01"),
        empathement: "KL-890-MN",
        carType: new Types.ObjectId("000000000000000000000009"),  // "Crossover"
        engineType: new Types.ObjectId("000000000000000000000009"),  // "Hydrogène"
        sizeType: new Types.ObjectId("000000000000000000000001"),  // "Petite"
        weightType: new Types.ObjectId("000000000000000000000003"),  // "Lourde"
      }
    ] 
  }
];


module.exports = { DEFAULTDATA };
