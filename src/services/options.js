const optionsRepository = require('../repositories/options');

exports.getOptions = async (option_id, car_id) => {
	return optionsRepository.getOptions(option_id, car_id);
};
