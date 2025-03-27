const mongoose = require("mongoose");
const Emp = require("../emp/emp");
const CarCostumer = require("./carCostumer"); 
const Service = require("../service");

const servicesClientSchema = new mongoose.Schema(
  {
    idcustomer: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Emp", 
      required: true 
    },
    idcarcustomer: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "CarCostumer", 
      required: true 
    },
    datedebut: { 
      type: Date, 
    },
    datedemande: { 
      type: Date, 
      required: true 
    },
    datefin: { 
      type: Date, 
    },
    payed: { 
      type: Boolean, 
      required: true 
    },
    detail: [
      { 
        idservice: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: "Service"
        },
        idmechanic: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: "Emp"
        },
        prix: { 
          type: Number, 
          required: true 
        },
        datedebut: { 
          type: Date, 
        },
        datefin: { 
          type: Date,  
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("servicesClient", servicesClientSchema);
