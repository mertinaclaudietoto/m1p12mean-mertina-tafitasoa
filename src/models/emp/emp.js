const mongoose = require('mongoose');
const { Schema } = mongoose;
const Rule = require('../emp/rule');
const Sex = require('../emp/sex');
// Définir un sous-schema pour creditCard

const CreditCardSchema = new Schema({
  namecard: {
    type: String,
    required: true
  },
  cardnumber: {
    type: String,
    required: true,
    validate: {
      validator: v => /^\d{16}$/.test(v),
      message: props => `${props.value} n'est pas un numéro de carte valide à 16 chiffres`
    }
  },
  cvv: {
    type: String,
    required: true,
    validate: {
      validator: v => /^\d{3}$/.test(v),
      message: props => `${props.value} n'est pas un CVV valide à 3 chiffres`
    }
  },
  expiration: {
    type: String,
    required: true,
    validate: {
      validator: v => /^(0[1-9]|1[0-2])\/\d{2}$/.test(v),
      message: props => `${props.value} n'est pas une date d'expiration valide (mm/yy)`
    }
  }
}, { _id: false }); // _id false pour ne pas créer un ID pour le sous-document

const EmpSchema = new mongoose.Schema({
  picture:{ type: String },
  name: { type: String, required: true },
  firstName: { type: String, required: true },
  dateofbirth: { type: String, required: true },
  sex:{type: mongoose.Schema.Types.ObjectId, ref: 'Sex',required:true},
  dateofemp: { type: String  },
  login: {type: String,required: true, unique: true},
  rule:{ type: mongoose.Schema.Types.ObjectId, ref: 'Rule', required: true },
  password: {type: String,required: true,},
  active: { type: Number, required: true },
  creditCard: {
    type: CreditCardSchema,
    required: false,
    validate: {
      validator: function (v) {
        if (!v) return true;
        return (
          v.namecard &&
          /^\d{16}$/.test(v.cardnumber) &&
          /^\d{3}$/.test(v.cvv) &&
          /^(0[1-9]|1[0-2])\/\d{2}$/.test(v.expiration)
        );
      },
      message: 'Si une carte est fournie, tous les champs doivent être valides.'
    }
  }
});
const Emp = mongoose.model('Emp', EmpSchema);
module.exports = Emp;
