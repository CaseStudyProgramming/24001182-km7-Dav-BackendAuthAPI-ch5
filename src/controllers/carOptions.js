const carOptionsService = require('../services/carOptions');
const { SuccessResponse } = require('../utils/response');

exports.getCarOptions = async (req, res, next) => {
	const data = await carOptionsService.getCarOptions(req.query?.option_name);
	SuccessResponse(res, data);
};

exports.getCarOptionById = async (req, res, next) => {
	const { id } = req.params;
	const data = await carOptionsService.getCarOptionById(id);
	SuccessResponse(res, data);
};

exports.createCarOption = async (req, res, next) => {
	const data = await carOptionsService.createCarOption(req.body);
	SuccessResponse(res, data);
};

exports.updateCarOption = async (req, res, next) => {
	const { id } = req.params;
	const data = await carOptionsService.updateCarOption(id, req.body);
	SuccessResponse(res, data);
};

exports.deleteCarOptionById = async (req, res, next) => {
	const { id } = req.params;
	const data = await carOptionsService.deleteCarOptionById(id);
	SuccessResponse(res, data);
};
