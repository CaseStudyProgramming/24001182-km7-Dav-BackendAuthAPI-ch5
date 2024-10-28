const typeService = require("../services/type");
const { SuccessResponse } = require("../utils/response");

exports.getTypes = async (req, res, next) => {
  const data = await typeService.getTypes(req.query?.type_option);
  SuccessResponse(res, data);
};

exports.getTypeById = async (req, res, next) => {
  const { id } = req.params;
  const data = await typeService.getTypeById(id);
  SuccessResponse(res, data);
};

exports.createType = async (req, res, next) => {
  const data = await typeService.createType(req.body);
  SuccessResponse(res, data);
};

exports.updateType = async (req, res, next) => {
  const { id } = req.params;
  const data = await typeService.updateType(id, req.body);
  SuccessResponse(res, data);
};

exports.deleteTypeById = async (req, res, next) => {
  const { id } = req.params;
  const data = await typeService.deleteTypeById(id);
  SuccessResponse(res, data);
};
