const { z } = require('zod');
const { BadRequestError } = require('../utils/request');

exports.validateGetTransmissions = (req, res, next) => {
	const validateQuery = z.object({
		transmission_option: z.string().optional().nullable(),
	});

	const resultValidateQuery = validateQuery.safeParse(req.query);
	if (!resultValidateQuery.success) {
		// If validation fails, return error messages
		throw new BadRequestError(resultValidateQuery.error.errors);
	}

	next();
};

exports.validateGetTransmissionById = (req, res, next) => {
	const validateParams = z.object({
		id: z.string(),
	});

	const result = validateParams.safeParse(req.params);
	if (!result.success) {
		throw new BadRequestError(result.error.errors);
	}

	next();
};

exports.validateCreateTransmission = (req, res, next) => {
	// Validation body schema
	const validateBody = z.object({
		transmission_option: z.string().optional().nullable(),
	});

	// Validate
	const result = validateBody.safeParse(req.body);
	if (!result.success) {
		// If validation fails, return error messages
		throw new BadRequestError(result.error.errors);
	}

	next();
};

exports.validateUpdateTransmission = (req, res, next) => {
	const validateParams = z.object({
		id: z.string(),
	});

	const resultParams = validateParams.safeParse(req.params);
	if (!resultParams.success) {
		throw new BadRequestError(resultParams.error.errors);
	}

	const validateBody = z.object({
		transmission_option: z.string().optional(),
	});

	const resultBody = validateBody.safeParse(req.body);
	if (!resultBody.success) {
		throw new BadRequestError(resultBody.error.errors);
	}

	next();
};

exports.validateDeleteTransmissionById = (req, res, next) => {
	// Make a validation schema
	const validateParams = z.object({
		id: z.string(),
	});

	const result = validateParams.safeParse(req.params);
	if (!result.success) {
		// If validation fails, return error messages
		throw new BadRequestError(result.error.errors);
	}

	next();
};
