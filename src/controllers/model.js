const modelService = require("../services/model");
const { SuccessResponse } = require("../utils/response");

exports.getModels = async (req, res, next) => {
  const data = await modelService.getModels(req.query?.model_name);
  SuccessResponse(res, data);
};

exports.getModelById = async (req, res, next) => {
  const { id } = req.params;
  const data = await modelService.getModelById(id);
  SuccessResponse(res, data);
};

exports.createModel = async (req, res, next) => {
  const data = await modelService.createModel(req.body);
  SuccessResponse(res, data);
};

exports.updateModel = async (req, res, next) => {
  const { id } = req.params;
  const data = await modelService.updateModel(id, req.body);
  SuccessResponse(res, data);
};

exports.deleteModelById = async (req, res, next) => {
  const { id } = req.params;
  const data = await modelService.deleteModelById(id);
  SuccessResponse(res, data);
};
