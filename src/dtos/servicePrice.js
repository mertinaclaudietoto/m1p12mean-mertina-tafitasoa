class ServicePrice {
  constructor(service) {
    this._id = service._id;
    this.name = service.name;
    this.sizeTypePrice = 0;
    this.carTypePrice = 0;
    this.engineTypePrice = 0;
    this.weigthTypePrice = 0;
    this.price = 0;
  }
}
module.exports = ServicePrice;
