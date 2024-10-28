//src/services/carsServices

const repoCars = require("../repositories/carsRepositories");
const { imageUpload } = require("../utils/images-kit.js");

exports.getAllCars = async (
  plate,
  rentPerDay,
  capacity,
  description,
  availableAt,
  available,
  year,
  image
) => {
  return repoCars.getAllCars(
    plate,
    rentPerDay,
    capacity,
    description,
    availableAt,
    available,
    year,
    image
  );
};

exports.getCarById = async (id) => {
  const serviceCarId = await repoCars.getCarById(id);
  if (!serviceCarId) {
    throw new NotFoundError("Car not found");
  }
  return serviceCarId;
};

exports.createCar = async (carBody, imageFile) => {
  if (imageFile?.image) {
    carBody.image = await imageUpload(imageFile.image);
  }
  return repoCars.createCar(carBody);
};

exports.updateCar = async (id, carBody, imageFile) => {
  const existingCar = await repoCars.getCarById(id);
  if (!existingCar) {
    throw new NotFoundError("Car not found");
  }
  data = {
    ...existingCar,
    ...carBody,
  };
  if (imageFile?.image) {
    data.image = await imageUpload(imageFile.image);
  }
  const updateCar = await repoCars.updateCar(id, data);
  return updateCar;
};

exports.deleteCar = async (id) => {
  const car = await repoCars.getCarById(id);
  if (!car) {
    throw new NotFoundError("Car not found");
  }
  return repoCars.deleteCar(id);
};
