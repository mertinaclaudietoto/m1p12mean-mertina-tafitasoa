const CarType = require("../models/car/carType");
const engineTypes = require("../models/car/engineType");
const sizeTypes = require("../models/car/sizeType");
const weigthTypes = require("../models/car/weigthType");
const car = require("../models/car/car");
const service = require("../models/service/service");
const servicePrice = require("../models/service/servicePrice");


const { Types } = require('mongoose');  // Assurez-vous d'importer Types de mongoose
const Emp = require("../models/emp/emp");
const Rule = require("../models/emp/rule")
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
    model: weigthTypes, 
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
  
  { 
    model: car, 
    data: [
      {
        _id: new Types.ObjectId("000000000000000000000001"),
        picture: "https://example.com/image1.jpg",
        brand: "Toyota",
        model: "Corolla",
        version: "2025",
        datesortie: new Date("2025-01-01"),
        empathement: "AB-123-CD",
        carType: new Types.ObjectId("000000000000000000000001"),  // "Berline"
        engineType: new Types.ObjectId("000000000000000000000001"),  // "Essence"
        sizeType: new Types.ObjectId("000000000000000000000001"),  // "Petite"
        weigthType: new Types.ObjectId("000000000000000000000001"),  // "Légère"
      },
      {
        _id: new Types.ObjectId("000000000000000000000002"),
        picture: "https://example.com/image2.jpg",
        brand: "Ford",
        model: "Focus",
        version: "2024",
        datesortie: new Date("2024-01-01"),
        empathement: "EF-456-GH",
        carType: new Types.ObjectId("000000000000000000000002"),  // "Break"
        engineType: new Types.ObjectId("000000000000000000000002"),  // "Diesel"
        sizeType: new Types.ObjectId("000000000000000000000002"),  // "Moyenne"
        weigthType: new Types.ObjectId("000000000000000000000002"),  // "Moyenne"
      },
      {
        _id: new Types.ObjectId("000000000000000000000003"),
        picture: "https://example.com/image3.jpg",
        brand: "BMW",
        model: "X5",
        version: "2023",
        datesortie: new Date("2023-01-01"),
        empathement: "IJ-789-KL",
        carType: new Types.ObjectId("000000000000000000000008"),  // "SUV"
        engineType: new Types.ObjectId("000000000000000000000006"),  // "Électrique CC"
        sizeType: new Types.ObjectId("000000000000000000000003"),  // "Grande"
        weigthType: new Types.ObjectId("000000000000000000000003"),  // "Lourde"
      },
      {
        _id: new Types.ObjectId("000000000000000000000004"),
        picture: "https://example.com/image4.jpg",
        brand: "Mercedes",
        model: "A-Class",
        version: "2022",
        datesortie: new Date("2022-01-01"),
        empathement: "MN-012-OP",
        carType: new Types.ObjectId("000000000000000000000003"),  // "Coupé"
        engineType: new Types.ObjectId("000000000000000000000004"),  // "Hybride Parallèle"
        sizeType: new Types.ObjectId("000000000000000000000002"),  // "Moyenne"
        weigthType: new Types.ObjectId("000000000000000000000001"),  // "Légère"
      },
      {
        _id: new Types.ObjectId("000000000000000000000010"),
        picture: "https://example.com/image5.jpg",
        brand: "Audi",
        model: "A6",
        version: "2021",
        datesortie: new Date("2021-01-01"),
        empathement: "QR-345-ST",
        carType: new Types.ObjectId("000000000000000000000004"),  // "Cabriolet"
        engineType: new Types.ObjectId("000000000000000000000005"),  // "Hybride Plug-in"
        sizeType: new Types.ObjectId("000000000000000000000003"),  // "Grande"
        weigthType: new Types.ObjectId("000000000000000000000002"),  // "Moyenne"
      },
      {
        _id: new Types.ObjectId("000000000000000000000005"),
        picture: "https://example.com/image6.jpg",
        brand: "Nissan",
        model: "Leaf",
        version: "2020",
        datesortie: new Date("2020-01-01"),
        empathement: "UV-678-WX",
        carType: new Types.ObjectId("000000000000000000000008"),  // "SUV"
        engineType: new Types.ObjectId("000000000000000000000007"),  // "Électrique Synchrone"
        sizeType: new Types.ObjectId("000000000000000000000002"),  // "Moyenne"
        weigthType: new Types.ObjectId("000000000000000000000003"),  // "Lourde"
      },
      {
        _id: new Types.ObjectId("000000000000000000000006"),
        picture: "https://example.com/image7.jpg",
        brand: "Chevrolet",
        model: "Camaro",
        version: "2019",
        datesortie: new Date("2019-01-01"),
        empathement: "YZ-901-AB",
        carType: new Types.ObjectId("000000000000000000000005"),  // "Hatchback"
        engineType: new Types.ObjectId("000000000000000000000003"),  // "Hybride Série"
        sizeType: new Types.ObjectId("000000000000000000000001"),  // "Petite"
        weigthType: new Types.ObjectId("000000000000000000000001"),  // "Légère"
      },
      {
        _id: new Types.ObjectId("000000000000000000000007"),
        picture: "https://example.com/image8.jpg",
        brand: "Volkswagen",
        model: "Golf",
        version: "2018",
        datesortie: new Date("2018-01-01"),
        empathement: "CD-234-EF",
        carType: new Types.ObjectId("000000000000000000000006"),  // "Roadster"
        engineType: new Types.ObjectId("000000000000000000000002"),  // "Diesel"
        sizeType: new Types.ObjectId("000000000000000000000002"),  // "Moyenne"
        weigthType: new Types.ObjectId("000000000000000000000002"),  // "Moyenne"
      },
      {
        _id: new Types.ObjectId("000000000000000000000008"),
        picture: "https://example.com/image9.jpg",
        brand: "Porsche",
        model: "911",
        version: "2017",
        datesortie: new Date("2017-01-01"),
        empathement: "GH-567-IJ",
        carType: new Types.ObjectId("000000000000000000000007"),  // "Limousine"
        engineType: new Types.ObjectId("000000000000000000000008"),  // "Électrique Asynchrone"
        sizeType: new Types.ObjectId("000000000000000000000003"),  // "Grande"
        weigthType: new Types.ObjectId("000000000000000000000001"),  // "Légère"
      },
      {
        _id: new Types.ObjectId("000000000000000000000009"),
        picture: "https://example.com/image10.jpg",
        brand: "Ferrari",
        model: "488 GTB",
        version: "2016",
        datesortie: new Date("2016-01-01"),
        empathement: "KL-890-MN",
        carType: new Types.ObjectId("000000000000000000000009"),  // "Crossover"
        engineType: new Types.ObjectId("000000000000000000000009"),  // "Hydrogène"
        sizeType: new Types.ObjectId("000000000000000000000001"),  // "Petite"
        weigthType: new Types.ObjectId("000000000000000000000003"),  // "Lourde"
      }
    ] 
  },{
    model: servicePrice, 
    data: [
        { _id: new Types.ObjectId("000000000000000000000001"),price:10000, car:new Types.ObjectId("000000000000000000000001"),
          service:new Types.ObjectId("000000000000000000000001")
        },
        { _id: new Types.ObjectId("000000000000000000000002"),price:15000, car:new Types.ObjectId("000000000000000000000002"),
          service:new Types.ObjectId("000000000000000000000001")
        },
        { _id: new Types.ObjectId("000000000000000000000003"),price:10000, car:new Types.ObjectId("000000000000000000000003"),
          service:new Types.ObjectId("000000000000000000000001")
        },
        { _id: new Types.ObjectId("000000000000000000000004"),price:15000, car:new Types.ObjectId("000000000000000000000004"),
          service:new Types.ObjectId("000000000000000000000001")
        },
        { _id: new Types.ObjectId("000000000000000000000005"),price:20000, car:new Types.ObjectId("000000000000000000000005"),
          service:new Types.ObjectId("000000000000000000000001")
        },
        { _id: new Types.ObjectId("000000000000000000000006"),price:15000, car:new Types.ObjectId("000000000000000000000006"),
          service:new Types.ObjectId("000000000000000000000001")
        },
        { _id: new Types.ObjectId("000000000000000000000007"),price:20000, car:new Types.ObjectId("000000000000000000000007"),
          service:new Types.ObjectId("000000000000000000000001")
        },
        { _id: new Types.ObjectId("000000000000000000000008"),price:20000, car:new Types.ObjectId("000000000000000000000008"),
          service:new Types.ObjectId("000000000000000000000001")
        },
        { _id: new Types.ObjectId("000000000000000000000009"),price:15000, car:new Types.ObjectId("000000000000000000000009"),
          service:new Types.ObjectId("000000000000000000000001")
        },
        { _id: new Types.ObjectId("000000000000000000000010"),price:20000, car:new Types.ObjectId("000000000000000000000010"),
          service:new Types.ObjectId("000000000000000000000001")
        },
//   
        { _id: new Types.ObjectId("000000000000000000000011"),price:10000, car:new Types.ObjectId("000000000000000000000001"),
          service:new Types.ObjectId("000000000000000000000002")
        },
        { _id: new Types.ObjectId("000000000000000000000012"),price:15000, car:new Types.ObjectId("000000000000000000000002"),
          service:new Types.ObjectId("000000000000000000000002")
        },
        { _id: new Types.ObjectId("000000000000000000000013"),price:10000, car:new Types.ObjectId("000000000000000000000003"),
          service:new Types.ObjectId("000000000000000000000002")
        },
        { _id: new Types.ObjectId("000000000000000000000014"),price:15000, car:new Types.ObjectId("000000000000000000000004"),
          service:new Types.ObjectId("000000000000000000000002")
        },
        { _id: new Types.ObjectId("000000000000000000000015"),price:20000, car:new Types.ObjectId("000000000000000000000005"),
          service:new Types.ObjectId("000000000000000000000002")
        },
        { _id: new Types.ObjectId("000000000000000000000016"),price:15000, car:new Types.ObjectId("000000000000000000000006"),
          service:new Types.ObjectId("000000000000000000000002")
        },
        { _id: new Types.ObjectId("000000000000000000000017"),price:20000, car:new Types.ObjectId("000000000000000000000007"),
          service:new Types.ObjectId("000000000000000000000002")
        },
        { _id: new Types.ObjectId("000000000000000000000018"),price:20000, car:new Types.ObjectId("000000000000000000000008"),
          service:new Types.ObjectId("000000000000000000000002")
        },
        { _id: new Types.ObjectId("000000000000000000000019"),price:15000, car:new Types.ObjectId("000000000000000000000009"),
          service:new Types.ObjectId("000000000000000000000002")
        },
        { _id: new Types.ObjectId("000000000000000000000020"),price:20000, car:new Types.ObjectId("000000000000000000000010"),
          service:new Types.ObjectId("000000000000000000000002")
        },
// 3
        { _id: new Types.ObjectId("000000000000000000000021"),price:10000, car:new Types.ObjectId("000000000000000000000001"),
          service:new Types.ObjectId("000000000000000000000003")
        },
        { _id: new Types.ObjectId("000000000000000000000022"),price:15000, car:new Types.ObjectId("000000000000000000000002"),
          service:new Types.ObjectId("000000000000000000000003")
        },
        { _id: new Types.ObjectId("000000000000000000000023"),price:10000, car:new Types.ObjectId("000000000000000000000003"),
          service:new Types.ObjectId("000000000000000000000003")
        },
        { _id: new Types.ObjectId("000000000000000000000024"),price:15000, car:new Types.ObjectId("000000000000000000000004"),
          service:new Types.ObjectId("000000000000000000000003")
        },
        { _id: new Types.ObjectId("000000000000000000000025"),price:20000, car:new Types.ObjectId("000000000000000000000005"),
          service:new Types.ObjectId("000000000000000000000003")
        },
        { _id: new Types.ObjectId("000000000000000000000026"),price:15000, car:new Types.ObjectId("000000000000000000000006"),
          service:new Types.ObjectId("000000000000000000000003")
        },
        { _id: new Types.ObjectId("000000000000000000000027"),price:20000, car:new Types.ObjectId("000000000000000000000007"),
          service:new Types.ObjectId("000000000000000000000003")
        },
        { _id: new Types.ObjectId("000000000000000000000028"),price:20000, car:new Types.ObjectId("000000000000000000000008"),
          service:new Types.ObjectId("000000000000000000000003")
        },
        { _id: new Types.ObjectId("000000000000000000000029"),price:15000, car:new Types.ObjectId("000000000000000000000009"),
          service:new Types.ObjectId("000000000000000000000003")
        },
        { _id: new Types.ObjectId("000000000000000000000030"),price:20000, car:new Types.ObjectId("000000000000000000000010"),
          service:new Types.ObjectId("000000000000000000000003")
        },
// 4 
        { _id: new Types.ObjectId("000000000000000000000031"),price:10000, car:new Types.ObjectId("000000000000000000000001"),
          service:new Types.ObjectId("000000000000000000000004")
        },
        { _id: new Types.ObjectId("000000000000000000000032"),price:15000, car:new Types.ObjectId("000000000000000000000002"),
          service:new Types.ObjectId("000000000000000000000004")
        },
        { _id: new Types.ObjectId("000000000000000000000033"),price:10000, car:new Types.ObjectId("000000000000000000000003"),
          service:new Types.ObjectId("000000000000000000000004")
        },
        { _id: new Types.ObjectId("000000000000000000000034"),price:15000, car:new Types.ObjectId("000000000000000000000004"),
          service:new Types.ObjectId("000000000000000000000004")
        },
        { _id: new Types.ObjectId("000000000000000000000035"),price:20000, car:new Types.ObjectId("000000000000000000000005"),
          service:new Types.ObjectId("000000000000000000000004")
        },
        { _id: new Types.ObjectId("000000000000000000000036"),price:15000, car:new Types.ObjectId("000000000000000000000006"),
          service:new Types.ObjectId("000000000000000000000004")
        },
        { _id: new Types.ObjectId("000000000000000000000037"),price:20000, car:new Types.ObjectId("000000000000000000000007"),
          service:new Types.ObjectId("000000000000000000000004")
        },
        { _id: new Types.ObjectId("000000000000000000000038"),price:20000, car:new Types.ObjectId("000000000000000000000008"),
          service:new Types.ObjectId("000000000000000000000004")
        },
        { _id: new Types.ObjectId("000000000000000000000039"),price:15000, car:new Types.ObjectId("000000000000000000000009"),
          service:new Types.ObjectId("000000000000000000000004")
        },
        { _id: new Types.ObjectId("000000000000000000000040"),price:20000, car:new Types.ObjectId("000000000000000000000010"),
          service:new Types.ObjectId("000000000000000000000004")
        },
// 5
        { _id: new Types.ObjectId("000000000000000000000041"),price:10000, car:new Types.ObjectId("000000000000000000000001"),
          service:new Types.ObjectId("000000000000000000000005")
        },
        { _id: new Types.ObjectId("000000000000000000000042"),price:15000, car:new Types.ObjectId("000000000000000000000002"),
          service:new Types.ObjectId("000000000000000000000005")
        },
        { _id: new Types.ObjectId("000000000000000000000043"),price:10000, car:new Types.ObjectId("000000000000000000000003"),
          service:new Types.ObjectId("000000000000000000000005")
        },
        { _id: new Types.ObjectId("000000000000000000000044"),price:15000, car:new Types.ObjectId("000000000000000000000004"),
          service:new Types.ObjectId("000000000000000000000005")
        },
        { _id: new Types.ObjectId("000000000000000000000045"),price:20000, car:new Types.ObjectId("000000000000000000000005"),
          service:new Types.ObjectId("000000000000000000000005")
        },
        { _id: new Types.ObjectId("000000000000000000000046"),price:15000, car:new Types.ObjectId("000000000000000000000006"),
          service:new Types.ObjectId("000000000000000000000005")
        },
        { _id: new Types.ObjectId("000000000000000000000047"),price:20000, car:new Types.ObjectId("000000000000000000000007"),
          service:new Types.ObjectId("000000000000000000000005")
        },
        { _id: new Types.ObjectId("000000000000000000000048"),price:20000, car:new Types.ObjectId("000000000000000000000008"),
          service:new Types.ObjectId("000000000000000000000005")
        },
        { _id: new Types.ObjectId("000000000000000000000049"),price:15000, car:new Types.ObjectId("000000000000000000000009"),
          service:new Types.ObjectId("000000000000000000000005")
        },
        { _id: new Types.ObjectId("000000000000000000000050"),price:20000, car:new Types.ObjectId("000000000000000000000010"),
          service:new Types.ObjectId("000000000000000000000005")
        },
    ]
  },
  {
    model: Emp, 
    data: [
      {
        _id: new Types.ObjectId("000000000000000000000001"),
        name: "Dupont",
        firstName: "Pierre",
        dateofbirth: "1990-01-01",
        dateofemp: "2015-03-15",
        login:"dupontprierre@gmail.com",
        rule:new Types.ObjectId("000000000000000000000003"),
        skills: [new Types.ObjectId("000000000000000000000001"), new Types.ObjectId("000000000000000000000002"),new Types.ObjectId("000000000000000000000003"),new Types.ObjectId("000000000000000000000004"),new Types.ObjectId("000000000000000000000005")] 
      },
      {
        _id: new Types.ObjectId("000000000000000000000002"),
        name: "Martin",
        firstName: "Claire",
        dateofbirth: "1985-08-23",
        dateofemp: "2010-06-10",
        login:"martinclaire@gmail.com",
        rule:new Types.ObjectId("000000000000000000000003"),
        skills: [new Types.ObjectId("000000000000000000000001"), new Types.ObjectId("000000000000000000000002"),new Types.ObjectId("000000000000000000000005")] 
      },
      {
        _id: new Types.ObjectId("000000000000000000000003"),
        name: "Durand",
        firstName: "Julien",
        dateofbirth: "1993-11-11",
        dateofemp: "2018-09-01",
        login:"durandjulien@gmail.com",
        rule:new Types.ObjectId("000000000000000000000003"),
        skills: [new Types.ObjectId("000000000000000000000001"), new Types.ObjectId("000000000000000000000002"),new Types.ObjectId("000000000000000000000005")] 
      },
      {
        _id: new Types.ObjectId("000000000000000000000004"),
        name: "Lemoine",
        firstName: "Sophie",
        dateofbirth: "1992-05-14",
        dateofemp: "2016-12-25",
        login:"lemoinesophie@gmail.com",
        rule:new Types.ObjectId("000000000000000000000003"),
        skills: [new Types.ObjectId("000000000000000000000003"), new Types.ObjectId("000000000000000000000004"),new Types.ObjectId("000000000000000000000005")] 
      },
      {
        _id: new Types.ObjectId("000000000000000000000005"),
        name: "Leclerc",
        firstName: "Maxime",
        dateofbirth: "1988-02-20",
        dateofemp: "2012-01-12",
        login:"leclercmaxime@gmail.com",
        rule:new Types.ObjectId("000000000000000000000003"),
        skills: [new Types.ObjectId("000000000000000000000001"), new Types.ObjectId("000000000000000000000002"),new Types.ObjectId("000000000000000000000003")] 
      }
    ]
  },
  { 
    model: Rule, 
    data: [
      { _id: new Types.ObjectId("000000000000000000000001"), name: "Manager" },
      { _id: new Types.ObjectId("000000000000000000000002"), name: "Custumer" },
      { _id: new Types.ObjectId("000000000000000000000003"), name: "Mechanic" },
    ] 
  },
];


module.exports = { DEFAULTDATA };
