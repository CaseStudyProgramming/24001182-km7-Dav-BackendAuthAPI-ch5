const serviceCarSpecs = require('../services/carspecsServices');
const { SuccessResponse } = require('../utils/response');
const { NotFoundError } = require('../utils/request');

exports.getAllCarSpecs = async (req, res, next) => {
    const specs = await serviceCarSpecs.getAllCarSpecs(
        req.query?.spec_name
    );
    SuccessResponse(res, specs);
}

exports.getCarSpecsById = async (req, res, next) => {
    const specs = await serviceCarSpecs.getCarSpecsById(req.params.id);
    SuccessResponse(res, specs);
}

exports.createCarSpecs = async (req, res, next) => {
    const specs = await serviceCarSpecs.createCarSpecs(req.body);
    SuccessResponse(res, specs, 201);
}

exports.deleteCarSpecs = async (req, res, next) => {
    const specs = await serviceCarSpecs.deleteCarSpecs(req.params.id);
    SuccessResponse(res, specs, 204);
}

exports.updateCarSpecs = async (req, res, next) => {
    const specs = await serviceCarSpecs.updateCarSpecs(req.params.id, req.body);
    SuccessResponse(res, specs, 200);
}
