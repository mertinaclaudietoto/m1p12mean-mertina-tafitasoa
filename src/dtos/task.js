class Task {
  constructor(_id, service, mechanic, prix, datedebut, datefin, is_finished) {
    this._id = _id;
    this.service = service;
    this.mechanic = mechanic;
    this.prix = prix;
    this.datedebut = datedebut;
    this.datefin = datefin;
    this.is_finished = is_finished;
  }
}
module.exports = Task;
