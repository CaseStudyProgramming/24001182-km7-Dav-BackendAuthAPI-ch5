const optionsService = require('../services/options');
const { SuccessResponse } = require('../utils/response');

exports.getOptions = async (req, res, next) => {
	const { option_id, car_id } = req.query;
	const data = await optionsService.getOptions(option_id, car_id);
	SuccessResponse(res, data);
};
