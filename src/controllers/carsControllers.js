//src/controllers/carsControllers
const serviceCars = require("../services/carsServices");
const { SuccessResponse } = require("../utils/response");
const { NotFoundError } = require("../utils/request");

exports.getAllCars = async (req, res, next) => {
  const cars = await serviceCars.getAllCars(
    req.query?.plate,
    req.query?.rentPerDay,
    req.query?.capacity,
    req.query?.description,
    req.query?.availableAt,
    req.query?.available,
    req.query?.year,
    req.query?.image
  );
  SuccessResponse(res, cars);
};

exports.getCarById = async (req, res, next) => {
  const controllerCarId = await serviceCars.getCarById(req.params.id);
  SuccessResponse(res, controllerCarId);
};

exports.createCar = async (req, res, next) => {
  const constollerNewCar = await serviceCars.createCar(req.body, req.files);
  SuccessResponse(res, constollerNewCar, 201);
};

exports.updateCar = async (req, res, next) => {
  const controllerUpdateCar = await serviceCars.updateCar(
    req.params.id,
    req.body,
    req.files
  );
  SuccessResponse(res, controllerUpdateCar);
};

exports.deleteCar = async (req, res, next) => {
  const controllerDeleteCar = await serviceCars.deleteCar(req.params.id);
  SuccessResponse(res, controllerDeleteCar);
};
