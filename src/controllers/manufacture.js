const manufactureService = require("../services/manufacture");
const { SuccessResponse } = require("../utils/response");

exports.getManufactures = async (req, res, next) => {
  const data = await manufactureService.getManufactures(
    req.query?.manufacture_name
  );
  SuccessResponse(res, data);
};

exports.getManufactureById = async (req, res, next) => {
  const { id } = req.params;
  const data = await manufactureService.getManufactureById(id);
  SuccessResponse(res, data);
};

exports.createManufacture = async (req, res, next) => {
  const data = await manufactureService.createManufacture(req.body);
  SuccessResponse(res, data);
};

exports.updateManufacture = async (req, res, next) => {
  const { id } = req.params;
  const data = await manufactureService.updateManufacture(id, req.body);
  SuccessResponse(res, data);
};

exports.deleteManufactureById = async (req, res, next) => {
  const { id } = req.params;
  const data = await manufactureService.deleteManufactureById(id);
  SuccessResponse(res, data);
};
