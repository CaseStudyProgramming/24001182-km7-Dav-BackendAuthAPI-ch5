const {z} = require('zod');
const { BadRequestError } = require('../utils/request');

exports.validateGetCarSpecs = (req, res, next) => {
    const validateQuery = z.object({
        spec_name: z.string().optional(),
    });
    const validateResult = validateQuery.safeParse(req.query);
    if (!validateResult.success) {
        throw new BadRequestError(validateResult.error.errors);
    }
    next();
}

exports.validateGetCarSpecsById = (req, res, next) => {
    const validateQuery = z.object({
        id: z.string(),
    });
    const validateResult = validateQuery.safeParse(req.params);
    if (!validateResult.success) {
        throw new BadRequestError(validateResult.error.errors);
    }
    next();
}   

exports.validateCreateCarSpecs = (req, res, next) => {
    const validateBody = z.object({
        spec_name: z.string(),
    });
    const validateResult = validateBody.safeParse(req.body);
    if (!validateResult.success) {
        throw new BadRequestError(validateResult.error.errors);
    }
    next();
}

exports.validateDeleteCarSpecs = (req, res, next) => {
    const validateQuery = z.object({
        id: z.string(),
    });
    const validateResult = validateQuery.safeParse(req.params);
    if (!validateResult.success) {
        throw new BadRequestError(validateResult.error.errors);
    }
    next();
}

exports.validateUpdateCarSpecs = (req, res, next) => {
    const validateBody = z.object({
        spec_name: z.string(),
    });
    const validateResult = validateBody.safeParse(req.body);
    if (!validateResult.success) {
        throw new BadRequestError(validateResult.error.errors);
    }
    next();
}
