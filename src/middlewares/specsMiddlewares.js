const {z} = require('zod');
const { BadRequestError } = require('../utils/request');

exports.validateGetSpecs = (req, res, next) => {
    const validateQuery = z.object({
        spec_id: z.string().optional(),
        car_id: z.string().optional(),
    });
    const validateResult = validateQuery.safeParse(req.query);
    if (!validateResult.success) {
        throw new BadRequestError(validateResult.error.errors);
    }
    next();
}

exports.validateCreateSpecs = (req, res, next) => {
    const validateBody = z.object({
        spec_name: z.string(),
    });
}
