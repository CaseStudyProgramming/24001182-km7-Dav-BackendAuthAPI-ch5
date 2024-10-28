const { z } = require('zod');
const { BadRequestError } = require('../utils/request');

exports.validateGetOptions = (req, res, next) => {
	const validateQuery = z.object({
		option_id: z.string().optional().nullable(),
		car_id: z.string().optional().nullable(),
	});

	const resultValidateQuery = validateQuery.safeParse(req.query);
	if (!resultValidateQuery.success) {
		throw new BadRequestError(resultValidateQuery.error.errors);
	}

	next();
};
