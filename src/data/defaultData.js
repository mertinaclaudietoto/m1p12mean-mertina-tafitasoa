const CarType = require("../models/carType");
const engineTypes = require("../models/engineType");
const sizeTypes = require("../models/sizeType");
const weigthTypes = require("../models/weigthType");
const carClients = require("../models/carCostumer");
const service = require("../models/service");
const { Types } = require('mongoose');  
const Emp = require("../models/emp/emp");
const Rule = require("../models/emp/rule");
const Sex = require("../models/emp/sex");


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
    model: Emp,
    data: [
      {
        _id: new Types.ObjectId("000000000000000000000001"),
        picture:"http://res.cloudinary.com/dcufspbrh/image/upload/v1742469815/ljdaexb0aj28bjeg0kjn.jpg",
        name: "Dupont",
        firstName: "Pierre",
        dateofbirth: "1990-01-01",
        dateofemp: "2015-03-15",
        login:"dupontprierre@gmail.com",
        password:"$2b$10$9scdzPACJsEvw.lxxjF.eO2HfaKLUFdxI824pFxDqiq105Cj32Smu",
        rule:new Types.ObjectId("000000000000000000000003"),
        sex:new Types.ObjectId("000000000000000000000001"),
        skills: [new Types.ObjectId("000000000000000000000001"), new Types.ObjectId("000000000000000000000002"),new Types.ObjectId("000000000000000000000003"),new Types.ObjectId("000000000000000000000004"),new Types.ObjectId("000000000000000000000005")] 
      },
      {
        _id: new Types.ObjectId("000000000000000000000002"),
        picture:"http://res.cloudinary.com/dcufspbrh/image/upload/v1742470067/malxlpujxlt7gmp6jaaf.jpg",
        name: "Martin",
        firstName: "Claire",
        dateofbirth: "1985-08-23",
        dateofemp: "2010-06-10",
        login:"martinclaire@gmail.com",
        password:"$2b$10$9scdzPACJsEvw.lxxjF.eO2HfaKLUFdxI824pFxDqiq105Cj32Smu",
        rule:new Types.ObjectId("000000000000000000000003"),
        sex:new Types.ObjectId("000000000000000000000001"),
        skills: [new Types.ObjectId("000000000000000000000001"), new Types.ObjectId("000000000000000000000002"),new Types.ObjectId("000000000000000000000005")] 
      },
      {
        _id: new Types.ObjectId("000000000000000000000003"),
        picture:"http://res.cloudinary.com/dcufspbrh/image/upload/v1742470110/i1gwdcdye99o7uyib9ur.jpg",
        name: "Durand",
        firstName: "Julien",
        dateofbirth: "1993-11-11",
        dateofemp: "2018-09-01",
        login:"durandjulien@gmail.com",
        password:"$2b$10$9scdzPACJsEvw.lxxjF.eO2HfaKLUFdxI824pFxDqiq105Cj32Smu",
        rule:new Types.ObjectId("000000000000000000000003"),
        sex:new Types.ObjectId("000000000000000000000001"),
        skills: [new Types.ObjectId("000000000000000000000001"), new Types.ObjectId("000000000000000000000002"),new Types.ObjectId("000000000000000000000005")] 
      },
      {
        _id: new Types.ObjectId("000000000000000000000004"),
        picture:"http://res.cloudinary.com/dcufspbrh/image/upload/v1742470138/wkaapsz1fzand61pbufd.jpg",
        name: "Lemoine",
        firstName: "Sophie",
        dateofbirth: "1992-05-14",
        dateofemp: "2016-12-25",
        login:"lemoinesophie@gmail.com",
        password:"$2b$10$9scdzPACJsEvw.lxxjF.eO2HfaKLUFdxI824pFxDqiq105Cj32Smu",
        rule:new Types.ObjectId("000000000000000000000003"),
        sex:new Types.ObjectId("000000000000000000000001"),
        skills: [new Types.ObjectId("000000000000000000000003"), new Types.ObjectId("000000000000000000000004"),new Types.ObjectId("000000000000000000000005")] 
      },
      {
        _id: new Types.ObjectId("000000000000000000000005"),
        picture:"http://res.cloudinary.com/dcufspbrh/image/upload/v1742470163/pjpkq8fmvhobr26xpgui.jpg",
        name: "Leclerc",
        firstName: "Maxime",
        dateofbirth: "1988-02-20",
        dateofemp: "2012-01-12",
        login:"leclercmaxime@gmail.com",
        password:"$2b$10$9scdzPACJsEvw.lxxjF.eO2HfaKLUFdxI824pFxDqiq105Cj32Smu",
        rule:new Types.ObjectId("000000000000000000000002"),
        sex:new Types.ObjectId("000000000000000000000001"),
        skills: [new Types.ObjectId("000000000000000000000001"), new Types.ObjectId("000000000000000000000002"),new Types.ObjectId("000000000000000000000003")] 
      }
    ]
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
      { _id: new Types.ObjectId("000000000000000000000002"), name: "Costumer" },
      { _id: new Types.ObjectId("000000000000000000000003"), name: "Mechanic" },
    ],
  },
  { 
    model: Sex, 
    data: [
      { _id: new Types.ObjectId("000000000000000000000001"), name: "Mal" },
      { _id: new Types.ObjectId("000000000000000000000002"), name: "Female" },
    ] 
  },
  { 
    model: carClients, 
    data: [
      {
        _id: new Types.ObjectId("000000000000000000000001"),
        picture: "http://res.cloudinary.com/dcufspbrh/image/upload/v1742370839/v6i2qbqoop6v3vnjcsll.jpg",
        brand: "Toyota",
        model: "Corolla",
        version: "2025",
        datesortie: new Date("2025-01-01"),
        empathement: "AB-123-CD",
        carType: new Types.ObjectId("000000000000000000000001"),  // "Berline"
        engineType: new Types.ObjectId("000000000000000000000001"),  // "Essence"
        sizeType: new Types.ObjectId("000000000000000000000001"),  // "Petite"
        weigthType: new Types.ObjectId("000000000000000000000001"),  // "Légère"
        costumer:new Types.ObjectId("000000000000000000000005")
      },
      {
        _id: new Types.ObjectId("000000000000000000000002"),
        picture: "http://res.cloudinary.com/dcufspbrh/image/upload/v1742368832/hxjrgpovi9zas9ryulzf.jpg",
        brand: "Ford",
        model: "Focus",
        version: "2024",
        datesortie: new Date("2024-01-01"),
        empathement: "EF-456-GH",
        carType: new Types.ObjectId("000000000000000000000002"),  // "Break"
        engineType: new Types.ObjectId("000000000000000000000002"),  // "Diesel"
        sizeType: new Types.ObjectId("000000000000000000000002"),  // "Moyenne"
        weigthType: new Types.ObjectId("000000000000000000000002"),  // "Moyenne"
        costumer:new Types.ObjectId("000000000000000000000005")
      },
      {
        _id: new Types.ObjectId("000000000000000000000003"),
        picture: "http://res.cloudinary.com/dcufspbrh/image/upload/v1742369018/traijeaxmocfs9ulmpj5.jpg",
        brand: "BMW",
        model: "X5",
        version: "2023",
        datesortie: new Date("2023-01-01"),
        empathement: "IJ-789-KL",
        carType: new Types.ObjectId("000000000000000000000008"),  // "SUV"
        engineType: new Types.ObjectId("000000000000000000000006"),  // "Électrique CC"
        sizeType: new Types.ObjectId("000000000000000000000003"),  // "Grande"
        weigthType: new Types.ObjectId("000000000000000000000003"),  // "Lourde"
        costumer:new Types.ObjectId("000000000000000000000005")
      },
      {
        _id: new Types.ObjectId("000000000000000000000004"),
        picture: "http://res.cloudinary.com/dcufspbrh/image/upload/v1742369252/dgsxtleelfvxfypm0xa1.jpg",
        brand: "Mercedes",
        model: "A-Class",
        version: "2022",
        datesortie: new Date("2022-01-01"),
        empathement: "MN-012-OP",
        carType: new Types.ObjectId("000000000000000000000003"),  // "Coupé"
        engineType: new Types.ObjectId("000000000000000000000004"),  // "Hybride Parallèle"
        sizeType: new Types.ObjectId("000000000000000000000002"),  // "Moyenne"
        weigthType: new Types.ObjectId("000000000000000000000001"),  // "Légère"
        costumer:new Types.ObjectId("000000000000000000000005")
      },
      {
        _id: new Types.ObjectId("000000000000000000000010"),
        picture: "http://res.cloudinary.com/dcufspbrh/image/upload/v1742369601/cmgmzwm9kqqqhimtos8k.jpg",
        brand: "Audi",
        model: "A6",
        version: "2021",
        datesortie: new Date("2021-01-01"),
        empathement: "QR-345-ST",
        carType: new Types.ObjectId("000000000000000000000004"),  // "Cabriolet"
        engineType: new Types.ObjectId("000000000000000000000005"),  // "Hybride Plug-in"
        sizeType: new Types.ObjectId("000000000000000000000003"),  // "Grande"
        weigthType: new Types.ObjectId("000000000000000000000002"),  // "Moyenne"
        costumer:new Types.ObjectId("000000000000000000000005")
      },
      {
        _id: new Types.ObjectId("000000000000000000000005"),
        picture:"http://res.cloudinary.com/dcufspbrh/image/upload/v1742369768/wa7vzo3rzcogakspjt5l.jpg",
        brand: "Nissan",
        model: "Leaf",
        version: "2020",
        datesortie: new Date("2020-01-01"),
        empathement: "UV-678-WX",
        carType: new Types.ObjectId("000000000000000000000008"),  // "SUV"
        engineType: new Types.ObjectId("000000000000000000000007"),  // "Électrique Synchrone"
        sizeType: new Types.ObjectId("000000000000000000000002"),  // "Moyenne"
        weigthType: new Types.ObjectId("000000000000000000000003"),  // "Lourde"
        costumer:new Types.ObjectId("000000000000000000000005")
      },
      {
        _id: new Types.ObjectId("000000000000000000000006"),
        picture:"http://res.cloudinary.com/dcufspbrh/image/upload/v1742370179/f0d3rovywplehuengeky.jpg",
        brand: "Chevrolet",
        model: "Camaro",
        version: "2019",
        datesortie: new Date("2019-01-01"),
        empathement: "YZ-901-AB",
        carType: new Types.ObjectId("000000000000000000000005"),  // "Hatchback"
        engineType: new Types.ObjectId("000000000000000000000003"),  // "Hybride Série"
        sizeType: new Types.ObjectId("000000000000000000000001"),  // "Petite"
        weigthType: new Types.ObjectId("000000000000000000000001"),  // "Légère"
        costumer:new Types.ObjectId("000000000000000000000005")
      },
      {
        _id: new Types.ObjectId("000000000000000000000007"),
        picture:"http://res.cloudinary.com/dcufspbrh/image/upload/v1742370532/p1dpixplhvgyae4dt6gj.jpg" ,
        brand: "Volkswagen",
        model: "Golf",
        version: "2018",
        datesortie: new Date("2018-01-01"),
        empathement: "CD-234-EF",
        carType: new Types.ObjectId("000000000000000000000006"),  // "Roadster"
        engineType: new Types.ObjectId("000000000000000000000002"),  // "Diesel"
        sizeType: new Types.ObjectId("000000000000000000000002"),  // "Moyenne"
        weigthType: new Types.ObjectId("000000000000000000000002"),  // "Moyenne"
        costumer:new Types.ObjectId("000000000000000000000005")
      },
      {
        _id: new Types.ObjectId("000000000000000000000008"),
        picture: "http://res.cloudinary.com/dcufspbrh/image/upload/v1742370619/rfbv1zbqkpiektceuzcu.jpg",
        brand: "Porsche",
        model: "911",
        version: "2017",
        datesortie: new Date("2017-01-01"),
        empathement: "GH-567-IJ",
        carType: new Types.ObjectId("000000000000000000000007"),  // "Limousine"
        engineType: new Types.ObjectId("000000000000000000000008"),  // "Électrique Asynchrone"
        sizeType: new Types.ObjectId("000000000000000000000003"),  // "Grande"
        weigthType: new Types.ObjectId("000000000000000000000001"),  // "Légère"
        costumer:new Types.ObjectId("000000000000000000000005")

      },
      {
        _id: new Types.ObjectId("000000000000000000000009"),
        picture: "http://res.cloudinary.com/dcufspbrh/image/upload/v1742370724/hmdjcgho32mioy8hb8r2.jpg",
        brand: "Ferrari",
        model: "488 GTB",
        version: "2016",
        datesortie: new Date("2016-01-01"),
        empathement: "KL-890-MN",
        carType: new Types.ObjectId("000000000000000000000009"),  // "Crossover"
        engineType: new Types.ObjectId("000000000000000000000009"),  // "Hydrogène"
        sizeType: new Types.ObjectId("000000000000000000000001"),  // "Petite"
        weigthType: new Types.ObjectId("000000000000000000000003"),  // "Lourde"
        costumer:new Types.ObjectId("000000000000000000000005")
      }
    ] 
  },
];

module.exports = { DEFAULTDATA };
