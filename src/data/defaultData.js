const CarType = require("../models/carType");
const engineTypes = require("../models/engineType");
const sizeTypes = require("../models/sizeType");
const weigthTypes = require("../models/weigthType");
const carClients = require("../models/client/carCostumer");
const service = require("../models/service");
const { Types } = require("mongoose");
const Emp = require("../models/emp/emp");
const Rule = require("../models/emp/rule");
const Sex = require("../models/emp/sex");
const serviceClient = require("../models/client/servicesClient");

const DEFAULTDATA = [
  {
    model: CarType,
    data: [
      {
        _id: new Types.ObjectId("000000000000000000000001"),
        name: "Berline",
        percentage: 100,
      },
      {
        _id: new Types.ObjectId("000000000000000000000002"),
        name: "Break",
        percentage: 95,
      },
      {
        _id: new Types.ObjectId("000000000000000000000003"),
        name: "Coupé",
        percentage: 80,
      },
      {
        _id: new Types.ObjectId("000000000000000000000004"),
        name: "Cabriolet",
        percentage: 75,
      },
      {
        _id: new Types.ObjectId("000000000000000000000005"),
        name: "Hatchback",
        percentage: 92,
      },
      {
        _id: new Types.ObjectId("000000000000000000000006"),
        name: "Limousine",
        percentage: 93,
      },
      {
        _id: new Types.ObjectId("000000000000000000000007"),
        name: "SUV",
        percentage: 94,
      },
      {
        _id: new Types.ObjectId("000000000000000000000008"),
        name: "Crossover",
        percentage: 97,
      },
      {
        _id: new Types.ObjectId("000000000000000000000009"),
        name: "Pick-up",
        percentage: 98,
      },
      {
        _id: new Types.ObjectId("000000000000000000000010"),
        name: "Monospace",
        percentage: 91,
      },
    ],
  },
  {
    model: engineTypes,
    data: [
      {
        _id: new Types.ObjectId("000000000000000000000001"),
        name: "Essence",
        percentage: 91,
      },
      {
        _id: new Types.ObjectId("000000000000000000000002"),
        name: "Diesel",
        percentage: 95,
      },
      {
        _id: new Types.ObjectId("000000000000000000000003"),
        name: "Hybride Série",
        percentage: 88,
      },
      {
        _id: new Types.ObjectId("000000000000000000000004"),
        name: "Hybride Parallèle",
        percentage: 93,
      },
      {
        _id: new Types.ObjectId("000000000000000000000005"),
        name: "Hybride Plug-in",
        percentage: 83,
      },
      {
        _id: new Types.ObjectId("000000000000000000000006"),
        name: "Électrique CC",
        percentage: 84,
      },
      {
        _id: new Types.ObjectId("000000000000000000000007"),
        name: "Électrique Synchrone",
        percentage: 85,
      },
      {
        _id: new Types.ObjectId("000000000000000000000008"),
        name: "Électrique Asynchrone",
        percentage: 86,
      },
      {
        _id: new Types.ObjectId("000000000000000000000009"),
        name: "Hydrogène",
        percentage: 96,
      },
      {
        _id: new Types.ObjectId("000000000000000000000010"),
        name: "Rotatif",
        percentage: 100,
      },
      {
        _id: new Types.ObjectId("000000000000000000000011"),
        name: "Gaz Naturel",
        percentage: 78,
      },
      {
        _id: new Types.ObjectId("000000000000000000000012"),
        name: "Biocarburant",
        percentage: 79,
      },
    ],
  },
  {
    model: Emp,
    data: [
      {
        _id: new Types.ObjectId("000000000000000000000001"),
        picture:
          "http://res.cloudinary.com/dcufspbrh/image/upload/v1742469815/ljdaexb0aj28bjeg0kjn.jpg",
        name: "Dupont",
        firstName: "Pierre",
        dateofbirth: "1990-01-01",
        dateofemp: "2015-03-15",
        login: "dupontprierre@gmail.com",
        password:
          "$2b$10$9scdzPACJsEvw.lxxjF.eO2HfaKLUFdxI824pFxDqiq105Cj32Smu",
        rule: new Types.ObjectId("000000000000000000000003"),
        sex: new Types.ObjectId("000000000000000000000001"),
        skills: [
          new Types.ObjectId("000000000000000000000001"),
          new Types.ObjectId("000000000000000000000002"),
          new Types.ObjectId("000000000000000000000003"),
          new Types.ObjectId("000000000000000000000004"),
          new Types.ObjectId("000000000000000000000005"),
        ],
      },
      {
        _id: new Types.ObjectId("000000000000000000000002"),
        picture:
          "http://res.cloudinary.com/dcufspbrh/image/upload/v1742470067/malxlpujxlt7gmp6jaaf.jpg",
        name: "Martin",
        firstName: "Claire",
        dateofbirth: "1985-08-23",
        dateofemp: "2010-06-10",
        login: "martinclaire@gmail.com",
        password:
          "$2b$10$9scdzPACJsEvw.lxxjF.eO2HfaKLUFdxI824pFxDqiq105Cj32Smu",
        rule: new Types.ObjectId("000000000000000000000003"),
        sex: new Types.ObjectId("000000000000000000000001"),
        skills: [
          new Types.ObjectId("000000000000000000000001"),
          new Types.ObjectId("000000000000000000000002"),
          new Types.ObjectId("000000000000000000000005"),
        ],
      },
      {
        _id: new Types.ObjectId("000000000000000000000003"),
        picture:
          "http://res.cloudinary.com/dcufspbrh/image/upload/v1742470110/i1gwdcdye99o7uyib9ur.jpg",
        name: "Durand",
        firstName: "Julien",
        dateofbirth: "1993-11-11",
        dateofemp: "2018-09-01",
        login: "durandjulien@gmail.com",
        password:
          "$2b$10$9scdzPACJsEvw.lxxjF.eO2HfaKLUFdxI824pFxDqiq105Cj32Smu",
        rule: new Types.ObjectId("000000000000000000000003"),
        sex: new Types.ObjectId("000000000000000000000001"),
        skills: [
          new Types.ObjectId("000000000000000000000001"),
          new Types.ObjectId("000000000000000000000002"),
          new Types.ObjectId("000000000000000000000005"),
        ],
      },
      {
        _id: new Types.ObjectId("000000000000000000000004"),
        picture:
          "http://res.cloudinary.com/dcufspbrh/image/upload/v1742470138/wkaapsz1fzand61pbufd.jpg",
        name: "Lemoine",
        firstName: "Sophie",
        dateofbirth: "1992-05-14",
        dateofemp: "2016-12-25",
        login: "lemoinesophie@gmail.com",
        password:
          "$2b$10$9scdzPACJsEvw.lxxjF.eO2HfaKLUFdxI824pFxDqiq105Cj32Smu",
        rule: new Types.ObjectId("000000000000000000000003"),
        sex: new Types.ObjectId("000000000000000000000001"),
        skills: [
          new Types.ObjectId("000000000000000000000003"),
          new Types.ObjectId("000000000000000000000004"),
          new Types.ObjectId("000000000000000000000005"),
        ],
      },
      {
        _id: new Types.ObjectId("000000000000000000000005"),
        picture:
          "http://res.cloudinary.com/dcufspbrh/image/upload/v1742470163/pjpkq8fmvhobr26xpgui.jpg",
        name: "Leclerc",
        firstName: "Maxime",
        dateofbirth: "1988-02-20",
        dateofemp: "2012-01-12",
        login: "leclercmaxime@gmail.com",
        password:
          "$2b$10$9scdzPACJsEvw.lxxjF.eO2HfaKLUFdxI824pFxDqiq105Cj32Smu",
        rule: new Types.ObjectId("000000000000000000000002"),
        sex: new Types.ObjectId("000000000000000000000001"),
        skills: [
          new Types.ObjectId("000000000000000000000001"),
          new Types.ObjectId("000000000000000000000002"),
          new Types.ObjectId("000000000000000000000003"),
        ],
      },
      {
        _id: new Types.ObjectId("000000000000000000000006"),
        picture:
          "http://res.cloudinary.com/dcufspbrh/image/upload/v1742470163/pjpkq8fmvhobr26xpgui.jpg",
        name: "Leclerc",
        firstName: "Maxime",
        dateofbirth: "1988-02-20",
        dateofemp: "2012-01-12",
        login: "mertinaclaudietoto@gmail.com",
        password:
          "$2b$10$9scdzPACJsEvw.lxxjF.eO2HfaKLUFdxI824pFxDqiq105Cj32Smu",
        rule: new Types.ObjectId("000000000000000000000001"),
        sex: new Types.ObjectId("000000000000000000000001"),
        skills: [],
      },
    ],
  },
  {
    model: sizeTypes,
    data: [
      {
        _id: new Types.ObjectId("000000000000000000000001"),
        name: "Petite",
        percentage: 80,
      },
      {
        _id: new Types.ObjectId("000000000000000000000002"),
        name: "Moyenne",
        percentage: 78,
      },
      {
        _id: new Types.ObjectId("000000000000000000000003"),
        name: "Grande",
        percentage: 77,
      },
    ],
  },
  {
    model: weigthTypes,
    data: [
      {
        _id: new Types.ObjectId("000000000000000000000001"),
        name: "Légère",
        percentage: 93,
      },
      {
        _id: new Types.ObjectId("000000000000000000000002"),
        name: "Moyenne",
        percentage: 89,
      },
      {
        _id: new Types.ObjectId("000000000000000000000003"),
        name: "Lourde",
        percentage: 90,
      },
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
    ],
  },
  {
    model: carClients,
    data: [
      {
        _id: new Types.ObjectId("000000000000000000000001"),
        picture:
          "http://res.cloudinary.com/dcufspbrh/image/upload/v1742370839/v6i2qbqoop6v3vnjcsll.jpg",
        brand: "Toyota",
        model: "Corolla",
        version: "2025",
        datesortie: new Date("2025-01-01"),
        empathement: "AB-123-CD",
        carType: new Types.ObjectId("000000000000000000000001"),  
        engineType: new Types.ObjectId("000000000000000000000001"),  
        sizeType: new Types.ObjectId("000000000000000000000001"), 
        weigthType: new Types.ObjectId("000000000000000000000001"),  
        costumer:new Types.ObjectId("000000000000000000000005")
      },
      {
        _id: new Types.ObjectId("000000000000000000000002"),
        picture:
          "http://res.cloudinary.com/dcufspbrh/image/upload/v1742368832/hxjrgpovi9zas9ryulzf.jpg",
        brand: "Ford",
        model: "Focus",
        version: "2024",
        datesortie: new Date("2024-01-01"),
        empathement: "EF-456-GH",
        carType: new Types.ObjectId("000000000000000000000002"),  
        engineType: new Types.ObjectId("000000000000000000000002"),  
        sizeType: new Types.ObjectId("000000000000000000000002"),  
        weigthType: new Types.ObjectId("000000000000000000000002"),  
        costumer:new Types.ObjectId("000000000000000000000005")
      },
      {
        _id: new Types.ObjectId("000000000000000000000003"),
        picture:
          "http://res.cloudinary.com/dcufspbrh/image/upload/v1742369018/traijeaxmocfs9ulmpj5.jpg",
        brand: "BMW",
        model: "X5",
        version: "2023",
        datesortie: new Date("2023-01-01"),
        empathement: "IJ-789-KL",
        carType: new Types.ObjectId("000000000000000000000008"),  
        engineType: new Types.ObjectId("000000000000000000000006"),  
        sizeType: new Types.ObjectId("000000000000000000000003"), 
        weigthType: new Types.ObjectId("000000000000000000000003"),  
        costumer:new Types.ObjectId("000000000000000000000005")
      },
      {
        _id: new Types.ObjectId("000000000000000000000004"),
        picture:
          "http://res.cloudinary.com/dcufspbrh/image/upload/v1742369252/dgsxtleelfvxfypm0xa1.jpg",
        brand: "Mercedes",
        model: "A-Class",
        version: "2022",
        datesortie: new Date("2022-01-01"),
        empathement: "MN-012-OP",
        carType: new Types.ObjectId("000000000000000000000003"),  
        engineType: new Types.ObjectId("000000000000000000000004"),  
        sizeType: new Types.ObjectId("000000000000000000000002"),  
        weigthType: new Types.ObjectId("000000000000000000000001"),  
        costumer:new Types.ObjectId("000000000000000000000005")
      },
      {
        _id: new Types.ObjectId("000000000000000000000010"),
        picture:
          "http://res.cloudinary.com/dcufspbrh/image/upload/v1742369601/cmgmzwm9kqqqhimtos8k.jpg",
        brand: "Audi",
        model: "A6",
        version: "2021",
        datesortie: new Date("2021-01-01"),
        empathement: "QR-345-ST",
        carType: new Types.ObjectId("000000000000000000000004"),  
        engineType: new Types.ObjectId("000000000000000000000005"),  
        sizeType: new Types.ObjectId("000000000000000000000003"), 
        weigthType: new Types.ObjectId("000000000000000000000002"),  
        costumer:new Types.ObjectId("000000000000000000000005")
      },
      {
        _id: new Types.ObjectId("000000000000000000000005"),
        picture:
          "http://res.cloudinary.com/dcufspbrh/image/upload/v1742369768/wa7vzo3rzcogakspjt5l.jpg",
        brand: "Nissan",
        model: "Leaf",
        version: "2020",
        datesortie: new Date("2020-01-01"),
        empathement: "UV-678-WX",
        carType: new Types.ObjectId("000000000000000000000008"),  
        engineType: new Types.ObjectId("000000000000000000000007"),  
        sizeType: new Types.ObjectId("000000000000000000000002"),  
        weigthType: new Types.ObjectId("000000000000000000000003"),  
        costumer:new Types.ObjectId("000000000000000000000005")
      },
      {
        _id: new Types.ObjectId("000000000000000000000006"),
        picture:
          "http://res.cloudinary.com/dcufspbrh/image/upload/v1742370179/f0d3rovywplehuengeky.jpg",
        brand: "Chevrolet",
        model: "Camaro",
        version: "2019",
        datesortie: new Date("2019-01-01"),
        empathement: "YZ-901-AB",
        carType: new Types.ObjectId("000000000000000000000005"), 
        engineType: new Types.ObjectId("000000000000000000000003"),
        sizeType: new Types.ObjectId("000000000000000000000001"), 
        weigthType: new Types.ObjectId("000000000000000000000001"),  
        costumer:new Types.ObjectId("000000000000000000000005")
      },
      {
        _id: new Types.ObjectId("000000000000000000000007"),
        picture:
          "http://res.cloudinary.com/dcufspbrh/image/upload/v1742370532/p1dpixplhvgyae4dt6gj.jpg",
        brand: "Volkswagen",
        model: "Golf",
        version: "2018",
        datesortie: new Date("2018-01-01"),
        empathement: "CD-234-EF",
        carType: new Types.ObjectId("000000000000000000000006"), 
        engineType: new Types.ObjectId("000000000000000000000002"),  
        sizeType: new Types.ObjectId("000000000000000000000002"),  
        weigthType: new Types.ObjectId("000000000000000000000002"),  
        costumer:new Types.ObjectId("000000000000000000000005")
      },
      {
        _id: new Types.ObjectId("000000000000000000000008"),
        picture:
          "http://res.cloudinary.com/dcufspbrh/image/upload/v1742370619/rfbv1zbqkpiektceuzcu.jpg",
        brand: "Porsche",
        model: "911",
        version: "2017",
        datesortie: new Date("2017-01-01"),
        empathement: "GH-567-IJ",
        carType: new Types.ObjectId("000000000000000000000007"),  
        engineType: new Types.ObjectId("000000000000000000000008"),  
        sizeType: new Types.ObjectId("000000000000000000000003"),
        weigthType: new Types.ObjectId("000000000000000000000001"),  
        costumer:new Types.ObjectId("000000000000000000000005")
      },
      {
        _id: new Types.ObjectId("000000000000000000000009"),
        picture:
          "http://res.cloudinary.com/dcufspbrh/image/upload/v1742370724/hmdjcgho32mioy8hb8r2.jpg",
        brand: "Ferrari",
        model: "488 GTB",
        version: "2016",
        datesortie: new Date("2016-01-01"),
        empathement: "KL-890-MN",
        carType: new Types.ObjectId("000000000000000000000009"), // "Crossover"
        engineType: new Types.ObjectId("000000000000000000000009"), // "Hydrogène"
        sizeType: new Types.ObjectId("000000000000000000000001"), // "Petite"
        weigthType: new Types.ObjectId("000000000000000000000003"), // "Lourde"
        costumer: new Types.ObjectId("000000000000000000000005"),
      },
    ],
  },
  {
    model: service,
    data: [
      {
        name: "Révision complète",
        sizeTypePrice: 150,
        carTypePrice: 100,
        engineTypePrice: 80,
        weigthTypePrice: 70,
      },
      {
        name: "Remplacement de plaquettes",
        sizeTypePrice: 120,
        carTypePrice: 90,
        engineTypePrice: 60,
        weigthTypePrice: 50,
      },
      {
        name: "Changement d'huile",
        sizeTypePrice: 80,
        carTypePrice: 60,
        engineTypePrice: 40,
        weigthTypePrice: 30,
      },
      {
        name: "Contrôle technique",
        sizeTypePrice: 90,
        carTypePrice: 70,
        engineTypePrice: 50,
        weigthTypePrice: 40,
      },
      {
        name: "Réparation freins",
        sizeTypePrice: 180,
        carTypePrice: 140,
        engineTypePrice: 100,
        weigthTypePrice: 80,
      },
      {
        name: "Remplacement filtres",
        sizeTypePrice: 100,
        carTypePrice: 80,
        engineTypePrice: 60,
        weigthTypePrice: 50,
      },
      {
        name: "Révision direction",
        sizeTypePrice: 200,
        carTypePrice: 160,
        engineTypePrice: 120,
        weigthTypePrice: 90,
      },
      {
        name: "Entretien climatisation",
        sizeTypePrice: 140,
        carTypePrice: 110,
        engineTypePrice: 80,
        weigthTypePrice: 60,
      },
      {
        name: "Réparation suspension",
        sizeTypePrice: 220,
        carTypePrice: 180,
        engineTypePrice: 130,
        weigthTypePrice: 100,
      },
      {
        name: "Remplacement courroies",
        sizeTypePrice: 160,
        carTypePrice: 130,
        engineTypePrice: 90,
        weigthTypePrice: 70,
      },
      {
        name: "Nettoyage profond moteur",
        sizeTypePrice: 110,
        carTypePrice: 90,
        engineTypePrice: 70,
        weigthTypePrice: 55,
      },
      {
        name: "Réglage géométrie",
        sizeTypePrice: 130,
        carTypePrice: 100,
        engineTypePrice: 75,
        weigthTypePrice: 60,
      },
    ]
  },
  {
    model: service, 
    data: [
        { _id: new Types.ObjectId("000000000000000000000001"), name: "Vidange d'huile",
          sizeTypePrice: 1000,
          carTypePrice:2000 ,
          engineTypePrice:3000 ,
          weigthTypePrice:4000
         },
        { _id: new Types.ObjectId("000000000000000000000002"), name: "Réparation de freins"
          ,sizeTypePrice: 1000,
          carTypePrice:2000 ,
          engineTypePrice:3000 ,
          weigthTypePrice:4000
         },
        { _id: new Types.ObjectId("000000000000000000000003"), name: "Changement de pneus",
          sizeTypePrice: 1000,
          carTypePrice:2000 ,
          engineTypePrice:3000 ,
          weigthTypePrice:4000
         },
        { _id: new Types.ObjectId("000000000000000000000004"), name: "Diagnostic électronique" 
          ,sizeTypePrice: 1000,
          carTypePrice:2000 ,
          engineTypePrice:3000 ,
          weigthTypePrice:4000
         },
        { _id: new Types.ObjectId("000000000000000000000005"), name: "Entretien du moteur" 
          ,sizeTypePrice: 1000,
          carTypePrice:2000 ,
          engineTypePrice:3000 ,
          weigthTypePrice:4000
         },
        { _id: new Types.ObjectId("000000000000000000000006"), name: "Réparation de carrosserie" ,
          sizeTypePrice: 1000,
          carTypePrice:2000 ,
          engineTypePrice:3000 ,
          weigthTypePrice:4000
         },
      ]
  },
  { 
    model: serviceClient, 
    data: [
      {
        _id: new Types.ObjectId("000000000000000000000001"),
        idcustomer: new Types.ObjectId("000000000000000000000001"),
        idcarcustomer: new Types.ObjectId("000000000000000000000001"),
        datedebut: "2024-03-01T08:00:00.000Z",
        datefin: "2024-03-05T18:00:00.000Z",
        datedemande:"2024-03-05T18:00:00.000Z",
        payed: true,
        detail: [
          {
            idservice: new Types.ObjectId("000000000000000000000001"),
            idmechanic: new Types.ObjectId("000000000000000000000001"),
            prix: 150,
            datedebut: "2024-03-01T09:00:00.000Z",
            datefin:null,
          },
          {
            idservice: new Types.ObjectId("000000000000000000000002"),
            idmechanic: new Types.ObjectId("000000000000000000000002"),
            prix: 200,
            datedebut: "2024-03-02T10:00:00.000Z",
            datefin: "2024-03-02T14:00:00.000Z"
          }
        ]
      },      {
        _id: new Types.ObjectId("000000000000000000000002"),
        idcustomer: new Types.ObjectId("000000000000000000000002"),
        idcarcustomer: new Types.ObjectId("000000000000000000000001"),
        datedebut: null,
        datefin:null,
        datedemande:"2024-03-05T18:00:00.000Z",
        payed: true,
        detail: [
          {
            idservice: new Types.ObjectId("000000000000000000000001"),
            idmechanic: new Types.ObjectId("000000000000000000000001"),
            prix: 150,
            datedebut: "2024-03-01T09:00:00.000Z",
            datefin:null,
          },
          {
            idservice: new Types.ObjectId("000000000000000000000002"),
            idmechanic: new Types.ObjectId("000000000000000000000002"),
            prix: 200,
            datedebut: "2024-03-02T10:00:00.000Z",
            datefin: "2024-03-02T14:00:00.000Z"
          }
        ]
      }
      
    ] 
  },
];

module.exports = { DEFAULTDATA };
