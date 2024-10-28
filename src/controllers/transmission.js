const transmissionService = require('../services/transmission');
const { SuccessResponse } = require('../utils/response'); // Pastikan jalur ini benar

exports.getTransmissions = async (req, res, next) => {
	const data = await transmissionService.getTransmissions(req.query?.transmission_option);
	SuccessResponse(res, data);
};

exports.getTransmissionById = async (req, res, next) => {
	const { id } = req.params;
	const data = await transmissionService.getTransmissionById(id);
	SuccessResponse(res, data);
};

exports.createTransmission = async (req, res, next) => {
	const data = await transmissionService.createTransmission(req.body);
	SuccessResponse(res, data);
};

exports.updateTransmission = async (req, res, next) => {
	const { id } = req.params;
	const data = await transmissionService.updateTransmission(id, req.body);
	SuccessResponse(res, data);
};

exports.deleteTransmissionById = async (req, res, next) => {
	const { id } = req.params;
	const data = await transmissionService.deleteTransmissionById(id);
	SuccessResponse(res, data);
};
