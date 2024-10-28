const repoSpecs = require('../repositories/specsRepositories');
const { imageUpload } = require('../utils/images-kit');

exports.getAllSpecs = async (spec_id, car_id) => {
    return repoSpecs.getAllSpecs(spec_id, car_id);
}

exports.getSpecsById = async (id) => {
    return repoSpecs.getSpecsById(id);
}
