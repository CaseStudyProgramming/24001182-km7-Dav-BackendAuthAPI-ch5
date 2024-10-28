const modelRepository = require("../repositories/model");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getModels = async (model_name) => {
  return modelRepository.getModels(model_name);
};

exports.getModelById = async (id) => {
  const model = await modelRepository.getModelById(id);
  if (!model) {
    throw new NotFoundError("Model is Not Found!");
  }

  return model;
};

exports.createModel = async (data) => {
  if (!data.model_name) {
    throw new InternalServerError(["Model name is required!"]);
  }

  return modelRepository.createModel(data);
};

exports.updateModel = async (id, data) => {
  const existingModel = await modelRepository.getModelById(id);
  if (!existingModel) {
    throw new NotFoundError("Model is Not Found!");
  }

  return modelRepository.updateModel(id, data);
};

exports.deleteModelById = async (id) => {
  const existingModel = await modelRepository.getModelById(id);
  if (!existingModel) {
    throw new NotFoundError("Model is Not Found!");
  }

  return modelRepository.deleteModelById(id);
};
