const ServicePrice = require("../dtos/servicePrice");
const CarCostumer = require("../models/carCostumer");
const CarType = require("../models/carType");
const EngineType = require("../models/engineType");
const Service = require("../models/service");
const SizeType = require("../models/sizeType");
const WeigthType = require("../models/weigthType");

exports.getServicePrice = async (carCostumerId) => {
  const car = await CarCostumer.findById(carCostumerId);
  if (!car) {
    throw new Error("Car not found");
  }
  const services = await Service.find();
  return Promise.all(
    services.map(async (service) => {
      const servicePrice = new ServicePrice(service);
      const sizeTypePrice = await getPriceSizeType(
        service.sizeTypePrice,
        car.sizeType
      );
      const carTypePrice = await getPriceCarType(
        service.carTypePrice,
        car.carType
      );
      const engineTypePrice = await getPriceEngineType(
        service.engineTypePrice,
        car.engineType
      );
      const weigthTypePrice = await getPriceWeightType(
        service.weigthTypePrice,
        car.weigthType
      );
      servicePrice.sizeTypePrice = sizeTypePrice;
      servicePrice.carTypePrice = carTypePrice;
      servicePrice.engineTypePrice = engineTypePrice;
      servicePrice.weigthTypePrice = weigthTypePrice;
      servicePrice.price = getTotalPrice(
        sizeTypePrice,
        carTypePrice,
        engineTypePrice,
        weigthTypePrice
      );
      return servicePrice;
    })
  );
};

const getPriceSizeType = async (sizeValue, sizeTypeId) => {
  const sizeType = await SizeType.findById(sizeTypeId);
  if (!sizeType) {
    throw new Error("SizeType not found");
  }
  return getPriceByPercentage(sizeValue, sizeType.percentage);
};

const getPriceCarType = async (carValue, carTypeId) => {
  const carType = await CarType.findById(carTypeId);
  if (!carType) {
    throw new Error("CarType not found");
  }
  return getPriceByPercentage(carValue, carType.percentage);
};

const getPriceEngineType = async (engineTypeValue, engineTypeId) => {
  const engineType = await EngineType.findById(engineTypeId);
  if (!engineType) {
    throw new Error("EngineType not found");
  }
  return getPriceByPercentage(engineTypeValue, engineType.percentage);
};

const getPriceWeightType = async (weigthTypeValue, weigthTypeId) => {
  const weigthType = await WeigthType.findById(weigthTypeId);
  if (!weigthType) {
    throw new Error("WeigthType not found");
  }
  return getPriceByPercentage(weigthTypeValue, weigthType.percentage);
};

const getPriceByPercentage = (value, percentage) => {
  return (percentage * value) / 100;
};

const getTotalPrice = (size, type, engine, weight) => {
  return size + type + engine + weight;
};
