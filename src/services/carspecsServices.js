const repoCarSpecs = require('../repositories/carspecsRepositories');
const { NotFoundError } = require('../utils/request');
const { imageUpload } = require('../utils/images-kit');

exports.getAllCarSpecs = async (spec_name) => {
    return repoCarSpecs.getAllCarSpecs(spec_name);
}

exports.getCarSpecsById = async (id) => {
    const serviceCarSpecsId = await repoCarSpecs.getCarSpecsById(id);
    if (!serviceCarSpecsId) {
        throw new NotFoundError('Car specs not found');
    }
    return serviceCarSpecsId;
} 

exports.createCarSpecs = async (carspecsBody) => {
    return repoCarSpecs.createCarSpecs(carspecsBody);
}

exports.deleteCarSpecs = async (id) => {
    const serviceCarSpecsId = await repoCarSpecs.getCarSpecsById(id);
    if (!serviceCarSpecsId) {
        throw new NotFoundError('Car specs not found');
    }
    return repoCarSpecs.deleteCarSpecs(id);
}

exports.updateCarSpecs = async (id, carspecsBody) => {
    const serviceCarSpecsId = await repoCarSpecs.getCarSpecsById(id);
    if (!serviceCarSpecsId) {
        throw new NotFoundError('Car specs not found');
    }
    return repoCarSpecs.updateCarSpecs(id, carspecsBody);
}

