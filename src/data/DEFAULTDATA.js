const { Types } = require("mongoose");
const Emp = require("../models/emp/emp");
const Rule = require("../models/emp/rule");
const Opinion = require("../models/costumer/opinion");
const Sex = require("../models/emp/sex");
const Chat = require("../models/chat/Chat");
const ServiceCostumer = require("../models/costumer/serviceCostumer");
const service01 = require("../models/services/service01");
const serviceCar = require("../models/services/carService");
const DEFAULTDATA = [
  {
    model:serviceCar,
    data:[
      {
        _id: new Types.ObjectId("000000000000000000000001"),
        picture: "http://res.cloudinary.com/dcufspbrh/image/upload/v1742370839/v6i2qbqoop6v3vnjcsll.jpg",
        brandandmodel: "Toyota Corolla 2025",
        servicelist: [
          {idservice: new Types.ObjectId("000000000000000000000001"),price: 5000,time: 60,commission:1000},
          {idservice: new Types.ObjectId("000000000000000000000002"),price: 7000,time: 5,commission:2000}
        ]
      },
      {
        _id: new Types.ObjectId("000000000000000000000002"),
        picture: "http://res.cloudinary.com/dcufspbrh/image/upload/v1742368832/hxjrgpovi9zas9ryulzf.jpg",
        brandandmodel: "Ford Focus 2024",
        servicelist: [
          {idservice: new Types.ObjectId("000000000000000000000001"),price: 5000,time: 3,commission:1000},
          {idservice: new Types.ObjectId("000000000000000000000002"),price: 7000,time: 5,commission:1000}
        ]
      },
      {
        _id: new Types.ObjectId("000000000000000000000003"),
        picture: "http://res.cloudinary.com/dcufspbrh/image/upload/v1742369018/traijeaxmocfs9ulmpj5.jpg",
        brandandmodel: "BMW X5 2023",
        servicelist: [
          {idservice: new Types.ObjectId("000000000000000000000001"),price: 5000,time: 3,commission:1000},
          {idservice: new Types.ObjectId("000000000000000000000002"), price: 7000,time: 5,commission:1000}
        ]
      },
      {
        _id: new Types.ObjectId("000000000000000000000004"),
        picture: "http://res.cloudinary.com/dcufspbrh/image/upload/v1742369252/dgsxtleelfvxfypm0xa1.jpg",
        brandandmodel: "Mercedes A-Class 2022",
        servicelist: [
          {idservice: new Types.ObjectId("000000000000000000000001"),price: 5000,time: 3,commission:1000},
          {idservice: new Types.ObjectId("000000000000000000000002"),price: 7000,time: 5,commission:1000}
        ]
      },
      {
        _id: new Types.ObjectId("000000000000000000000010"),
        picture: "http://res.cloudinary.com/dcufspbrh/image/upload/v1742369601/cmgmzwm9kqqqhimtos8k.jpg",
        brandandmodel: "Audi A6 2021",
        servicelist: [
          { idservice: new Types.ObjectId("000000000000000000000001"), price: 5000, time: 3,commission:1000},
          {idservice: new Types.ObjectId("000000000000000000000002"),price: 7000,time: 5,commission:1000}
        ]
      },
      {
        _id: new Types.ObjectId("000000000000000000000005"),
        picture: "http://res.cloudinary.com/dcufspbrh/image/upload/v1742369768/wa7vzo3rzcogakspjt5l.jpg",
        brandandmodel: "Nissan Leaf 2020",
        servicelist: [
          {idservice: new Types.ObjectId("000000000000000000000001"),price: 5000,time: 3,commission:1000},
          {idservice: new Types.ObjectId("000000000000000000000002"),price: 7000,time: 5,commission:1000}
        ]
      },
      {
        _id: new Types.ObjectId("000000000000000000000006"),
        picture: "http://res.cloudinary.com/dcufspbrh/image/upload/v1742370179/f0d3rovywplehuengeky.jpg",
        brandandmodel: "Chevrolet Camaro 2019",
        servicelist: [
          {idservice: new Types.ObjectId("000000000000000000000001"),price: 5000,time: 3,commission:1000},
          {idservice: new Types.ObjectId("000000000000000000000002"),price: 7000,time: 5,commission:1000}
        ]
      },
      {
        _id: new Types.ObjectId("000000000000000000000007"),
        picture: "http://res.cloudinary.com/dcufspbrh/image/upload/v1742370532/p1dpixplhvgyae4dt6gj.jpg",
        brandandmodel: "Volkswagen Golf 2018",
        servicelist: [
          {idservice: new Types.ObjectId("000000000000000000000001"),price: 5000,time: 3,commission:1000},
          {idservice: new Types.ObjectId("000000000000000000000002"),price: 7000,time: 5,commission:1000}
        ]
      },
      {
        _id: new Types.ObjectId("000000000000000000000008"),
        picture: "http://res.cloudinary.com/dcufspbrh/image/upload/v1742370619/rfbv1zbqkpiektceuzcu.jpg",
        brandandmodel: "Porsche 911 2017",
        servicelist: [
          {idservice: new Types.ObjectId("000000000000000000000001"),price: 5000,time: 3,commission:1000},
          {idservice: new Types.ObjectId("000000000000000000000002"),price: 7000,time: 5,commission:1000}
        ]
      },
      {
        _id: new Types.ObjectId("000000000000000000000009"),
        picture: "http://res.cloudinary.com/dcufspbrh/image/upload/v1742370724/hmdjcgho32mioy8hb8r2.jpg",
        brandandmodel: "Ferrari 488 GTB 2016",
        servicelist: [
          {idservice: new Types.ObjectId("000000000000000000000001"),price: 5000,time: 3,commission:1000},
          {idservice: new Types.ObjectId("000000000000000000000002"),price: 7000,time: 5,commission:1000}
        ]
      }
    ]
  },
  {
    model: service01,
    data: [
      {_id: new Types.ObjectId("000000000000000000000001"), name: "Vidange d'huile"},
      {_id: new Types.ObjectId("000000000000000000000002"),name: "Réparation de freins"},
      { _id: new Types.ObjectId("000000000000000000000003"),name: "Changement de pneus"},
      {_id: new Types.ObjectId("000000000000000000000004"),name: "Diagnostic électronique"},
      {_id: new Types.ObjectId("000000000000000000000005"),name: "Entretien du moteur"},
      {_id: new Types.ObjectId("000000000000000000000006"),name: "Réparation de carrosserie"},
      ],
  },
  {
    model: Emp,
    data: [
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
        active:1
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
        active:1
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
        active:1
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
        active:1
      },
      {
        _id: new Types.ObjectId("000000000000000000000006"),
        picture:
          "http://res.cloudinary.com/dcufspbrh/image/upload/v1742470163/pjpkq8fmvhobr26xpgui.jpg",
        name: "TOTO",
        firstName: "Mertina Claudie",
        dateofbirth: "1988-02-20",
        dateofemp: "2012-01-12",
        login: "mertinaclaudietoto@gmail.com",
        password:
          "$2b$10$9scdzPACJsEvw.lxxjF.eO2HfaKLUFdxI824pFxDqiq105Cj32Smu",
        rule: new Types.ObjectId("000000000000000000000001"),
        sex: new Types.ObjectId("000000000000000000000001"),
        active:1
      },
      {
        _id: new Types.ObjectId("000000000000000000000007"),
        picture:
          "http://res.cloudinary.com/dcufspbrh/image/upload/v1742470163/pjpkq8fmvhobr26xpgui.jpg",
        name: "Antoannet",
        firstName: "Marie",
        dateofbirth: "1988-02-20",
        dateofemp: "2012-01-12",
        login: "antoannetmarie@gmail.com",
        password:
          "$2b$10$9scdzPACJsEvw.lxxjF.eO2HfaKLUFdxI824pFxDqiq105Cj32Smu",
        rule: new Types.ObjectId("000000000000000000000002"),
        sex: new Types.ObjectId("000000000000000000000001"),
        active:1
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
    model: ServiceCostumer,
    data: [
      // Avril
      {
        _id: new Types.ObjectId(),
        idcostumer: new Types.ObjectId("000000000000000000000005"),
        etats: 1,
        dateappoitement:new Date("2025-04-01T09:00:00Z"),
        serviceList: [
          {
            idmechanic: null,
            service: {
              idservice: new Types.ObjectId("000000000000000000000001"),
              price: 5000,
              time: 60,
              commission: 1000,
            },
            startdate: new Date("2025-04-01T09:00:00Z"),
            enddate: new Date("2025-04-01T10:00:00Z"),
            nbrstars: 5,
            idcar:new Types.ObjectId("000000000000000000000001"),
            brandandmodel: "Toyota Corolla 2025",
            picture: "http://res.cloudinary.com/dcufspbrh/image/upload/v1742370839/v6i2qbqoop6v3vnjcsll.jpg",
          },
          {
            idmechanic: null,
            service: {
              idservice: new Types.ObjectId("000000000000000000000002"),
              price: 7000,
              time: 5,
              commission: 2000,
            },
            startdate: new Date("2025-04-02T14:00:00Z"),
            enddate: new Date("2025-04-02T15:30:00Z"),
            nbrstars: 5,
            idcar: new Types.ObjectId("000000000000000000000001"),
            brandandmodel: "Toyota Corolla 2025",
            picture: "http://res.cloudinary.com/dcufspbrh/image/upload/v1742370839/v6i2qbqoop6v3vnjcsll.jpg",
          },
        ],
      },
      {
        _id: new Types.ObjectId(),
        idcostumer: new Types.ObjectId("000000000000000000000007"),
        dateappoitement:new Date("2025-04-01T09:00:00Z"),
        etats: 2,
        serviceList: [
          {
            idmechanic: new Types.ObjectId("000000000000000000000004"),
            service: {
              idservice: new Types.ObjectId("000000000000000000000001"),
              price:5000,
              time: 3,
              commission: 1000,
            },
            startdate: new Date("2025-04-05T10:00:00Z"),
            enddate: new Date("2025-04-05T11:15:00Z"),
            nbrstars: 5,
            idcar: new Types.ObjectId("000000000000000000000002"),
            picture: "http://res.cloudinary.com/dcufspbrh/image/upload/v1742368832/hxjrgpovi9zas9ryulzf.jpg",
            brandandmodel: "Ford Focus 2024",
          },
        ],
      },
      {
        _id: new Types.ObjectId(),
        idcostumer: new Types.ObjectId("000000000000000000000007"),
        dateappoitement:new Date("2025-04-01T09:00:00Z"),
        etats: 2,
        serviceList: [
          {
            idmechanic: new Types.ObjectId("000000000000000000000003"),
            service: {
              idservice: new Types.ObjectId("000000000000000000000001"),
              price: 5000,
              time: 3,
              commission: 1000,
            },
            startdate: new Date("2025-04-10T08:30:00Z"),
            enddate: new Date("2025-04-10T09:30:00Z"),
            nbrstars: 5,
            idcar: new Types.ObjectId("000000000000000000000003"),
            picture: "http://res.cloudinary.com/dcufspbrh/image/upload/v1742369018/traijeaxmocfs9ulmpj5.jpg",
            brandandmodel: "BMW X5 2023",
          },
        ],
      },
      // Mai
      {
        _id: new Types.ObjectId(),
        idcostumer: new Types.ObjectId("000000000000000000000007"),
        dateappoitement:new Date("2025-04-01T09:00:00Z"),
        etats: 2,
        serviceList: [
          {
            idmechanic: new Types.ObjectId("000000000000000000000002"),
            service: {
              idservice: new Types.ObjectId("000000000000000000000001"),
              price: 5000,
              time: 3,
              commission: 1000,
            },
            startdate: new Date("2025-05-01T09:00:00Z"),
            enddate: new Date("2025-05-01T09:45:00Z"),
            nbrstars: 5,
            idcar: new Types.ObjectId("000000000000000000000004"),
            picture: "http://res.cloudinary.com/dcufspbrh/image/upload/v1742369252/dgsxtleelfvxfypm0xa1.jpg",
            brandandmodel: "Mercedes A-Class 2022",
          },
        ],
      },
      {
        _id: new Types.ObjectId(),
        idcostumer: new Types.ObjectId("000000000000000000000007"),
        dateappoitement:new Date("2025-04-01T09:00:00Z"),
        etats: 2,
        serviceList: [
          {
            idmechanic: new Types.ObjectId("000000000000000000000003"),
            service: {
              idservice: new Types.ObjectId("000000000000000000000001"),
              price: 5000,
              time: 3,
              commission: 1000,
            },
            startdate: new Date("2025-05-15T10:00:00Z"),
            enddate: new Date("2025-05-15T11:30:00Z"),
            nbrstars: 5,
            idcar: new Types.ObjectId("000000000000000000000004"),
            picture: "http://res.cloudinary.com/dcufspbrh/image/upload/v1742369252/dgsxtleelfvxfypm0xa1.jpg",
            brandandmodel: "Mercedes A-Class 2022",
          },
        ],
      },
      {
        _id: new Types.ObjectId("000000000000000000000001"),
        idcostumer: new Types.ObjectId("000000000000000000000007"),
        dateappoitement:new Date("2025-04-01T09:00:00Z"),
        etats: 2,
        serviceList: [
          {
            idmechanic:new Types.ObjectId("000000000000000000000001"),
            service: {
              idservice: new Types.ObjectId("000000000000000000000001"),
              price: 5000,
              time: 3,
              commission: 1000,
            },
            startdate: new Date("2025-05-20T14:00:00Z"),
            enddate: new Date("2025-05-20T15:20:00Z"),
            nbrstars: 5,
            idcar: new Types.ObjectId("000000000000000000000004"),
            picture: "http://res.cloudinary.com/dcufspbrh/image/upload/v1742369252/dgsxtleelfvxfypm0xa1.jpg",
            brandandmodel: "Mercedes A-Class 2022",
          },
        ],
      },
    ],
  },
   {
    model: Chat,
    data: [
      {
        sender: "000000000000000000000006",
        receiver: "000000000000000000000005",
        content: "Salut, tu es disponible pour la réunion ?",
        timestamp: "2025-07-06T09:30:00.000Z",
        isRead: true,
        islastMessage:false
      },
      {
      sender: "000000000000000000000005",
      receiver: "000000000000000000000006",
      content: "oui je le suis",
      timestamp: "2025-07-06T09:31:00.000Z",
      isRead: false,
      islastMessage:true
    },
    {
      sender: "000000000000000000000004",
      receiver: "000000000000000000000006",
      content: "Bonjour madane je suis arriver",
      timestamp: "2025-07-06T09:31:00.000Z",
      isRead: false,
      islastMessage:true
    },
    ],
  },
   {
    model: Opinion,
    data: [
      { costumer: new Types.ObjectId("000000000000000000000006"), message: "Très bon service, rapide et efficace. Le personnel est accueillant.",date:'2023-04-10' },
      { costumer: new Types.ObjectId("000000000000000000000002"), message: "Garage professionnel, les réparations ont été faites dans les délais annoncés.",date:'2023-04-10' },
      { costumer: new Types.ObjectId("000000000000000000000003"), message: "Prix raisonnables et excellent diagnostic. Je recommande !",date:'2023-04-10' },
      { costumer: new Types.ObjectId("000000000000000000000002"), message: "Première visite dans ce garage et très satisfait. Le mécanicien a bien pris le temps d’expliquer.",date:'2023-04-10' },
      { costumer: new Types.ObjectId("000000000000000000000003"), message: "Un garage honnête, ce qui devient rare. Pas de mauvaise surprise sur la facture.",date:'2023-04-10' },
      { costumer: new Types.ObjectId("000000000000000000000004"), message: "Accueil chaleureux, service impeccable. Je reviendrai sans hésiter.",date:'2023-04-10' },
      { costumer: new Types.ObjectId("000000000000000000000005"), message: "Réparation rapide et efficace. Mon véhicule roule comme neuf.",date:'2023-04-10' },
      { costumer: new Types.ObjectId("000000000000000000000006"), message: "Très bon rapport qualité-prix. Le patron est très professionnel.",date:'2023-04-10' },
      { costumer: new Types.ObjectId("000000000000000000000002"), message: "Un peu d’attente mais travail bien fait. Personnel compétent.",date:'2023-04-10' },
      { costumer: new Types.ObjectId("000000000000000000000006"), message: "Je recommande ce garage à 100 %, ils ont sauvé ma voiture juste avant mes vacances.",date:'2023-04-10' }
    ],
  },
  
];
module.exports = { DEFAULTDATA };