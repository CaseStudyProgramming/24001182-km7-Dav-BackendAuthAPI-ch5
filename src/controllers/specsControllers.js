const serviceSpecs = require('../services/specsServices');
const { SuccessResponse } = require('../utils/response');
const { NotFoundError } = require('../utils/request');

exports.getAllSpecs = async (req, res, next) => {
    const specs = await serviceSpecs.getAllSpecs(
        req.query?.spec_id,
        req.query?.car_id
    );
    SuccessResponse(res, specs);
}


