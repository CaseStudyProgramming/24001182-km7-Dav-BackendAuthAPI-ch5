const typeRepository = require("../repositories/type");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getTypes = async (type_option) => {
  return typeRepository.getTypes(type_option);
};

exports.getTypeById = async (id) => {
  const type = await typeRepository.getTypeById(id);
  if (!type) {
    throw new NotFoundError("Type is Not Found!");
  }

  return type;
};

exports.createType = async (data) => {
  if (!data.type_option) {
    throw new InternalServerError(["Type option is required!"]);
  }

  return typeRepository.createType(data);
};

exports.updateType = async (id, data) => {
  const existingType = await typeRepository.getTypeById(id);
  if (!existingType) {
    throw new NotFoundError("Type is Not Found!");
  }

  return typeRepository.updateType(id, data);
};

exports.deleteTypeById = async (id) => {
  const existingType = await typeRepository.getTypeById(id);
  if (!existingType) {
    throw new NotFoundError("Type is Not Found!");
  }

  return typeRepository.deleteTypeById(id);
};
