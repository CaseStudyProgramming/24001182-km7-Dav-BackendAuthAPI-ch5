//src/middlewares/carsMiddlerwares

const { z } = require("zod");
const { badrequestError, BadRequestError } = require("../utils/request");

exports.validateGetCars = (req, res, next) => {
  const validateQuery = z.object({
    plate: z.string().optional(),
    rentPerDay: z.number().optional(),
    capacity: z.number().optional(),
    description: z.string().optional(),
    availableAt: z.string().optional(),
    available: z.boolean().optional(),
    year: z.number().optional(),
    image: z.string().optional(),
  });
  const resultValidateQuery = validateQuery.safeParse(req.query);
  if (!resultValidateQuery.success) {
    throw new badrequestError(resultValidateQuery.error.errors);
  }
  next();
};

exports.validateGetCarById = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });
  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }
  next();
};

exports.validateCreateCar = (req, res, next) => {
  const validateBody = z.object({
    plate: z.string(),
    rentperday: z.string(),
    capacity: z.string(),
    description: z.string(),
    availableat: z.string(),
    available: z.string(),
    year: z.string(),
    transmission_id: z.string(),
    type_id: z.string(),
    manufacture_id: z.string(),
    model_id: z.string(),
    option_id: z.array(z.string()),
    spec_id: z.array(z.string()),
  });

  const validateImageFile = z.object({
    image: z.object({
      data: z.any(),
      name: z.string(),
    }),
  });

  const resultValidate = validateBody.safeParse(req.body);
  if (!resultValidate.success) {
    throw new BadRequestError(resultValidate.error.errors);
  }

  const resultValidateImage = validateImageFile.safeParse(req.files);
  if (!resultValidateImage.success) {
    throw new BadRequestError(resultValidateImage.error.errors);
  }

  next();
};

exports.validateUpdateCar = (req, res, next) => {
  const validateBody = z.object({
    plate: z.string().optional(),
    rentperday: z.string().optional(),
    capacity: z.string().optional(),
    description: z.string().optional(),
    availableat: z.string().optional(),
    available: z.string().optional(),
    year: z.string().optional(),
    transmission_id: z.string().optional(),
    type_id: z.string().optional(),
    manufacture_id: z.string().optional(),
    model_id: z.string().optional(),
    option_id: z.array(z.string()).optional(),
    spec_id: z.array(z.string()).optional(),
  });
  const validateImageFile = z.object({
    image: z.object({
      data: z.any(),
      name: z.string(),
    }),
  });

  const resultValidate = validateBody.safeParse(req.body);
  if (!resultValidate.success) {
    throw new BadRequestError(resultValidate.error.errors);
  }

  const resultValidateImage = validateImageFile.safeParse(req.files);
  if (!resultValidateImage.success) {
    throw new BadRequestError(resultValidateImage.error.errors);
  }
  next();
};

exports.validateDeleteCar = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });
  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }
  next();
};
