const manufactureRepository = require("../repositories/manufacture");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getManufactures = async (manufacture_name) => {
  return manufactureRepository.getManufactures(manufacture_name);
};

exports.getManufactureById = async (id) => {
  const manufacture = await manufactureRepository.getManufactureById(id);
  if (!manufacture) {
    throw new NotFoundError("Manufacture is Not Found!");
  }

  return manufacture;
};

exports.createManufacture = async (data) => {
  if (!data.manufacture_name) {
    throw new InternalServerError(["Manufacture name is required!"]);
  }

  return manufactureRepository.createManufacture(data);
};

exports.updateManufacture = async (id, data) => {
  const existingManufacture = await manufactureRepository.getManufactureById(
    id
  );
  if (!existingManufacture) {
    throw new NotFoundError("Manufacture is Not Found!");
  }

  return manufactureRepository.updateManufacture(id, data);
};

exports.deleteManufactureById = async (id) => {
  const existingManufacture = await manufactureRepository.getManufactureById(
    id
  );
  if (!existingManufacture) {
    throw new NotFoundError("Manufacture is Not Found!");
  }

  return manufactureRepository.deleteManufactureById(id);
};
