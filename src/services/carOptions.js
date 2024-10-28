const carOptionsRepository = require('../repositories/carOptions');
const { NotFoundError, InternalServerError } = require('../utils/request');

exports.getCarOptions = async option_name => {
	return carOptionsRepository.getCarOptions(option_name);
};

exports.getCarOptionById = async id => {
	const option = await carOptionsRepository.getCarOptionById(id);
	if (!option) {
		throw new NotFoundError('Car Option is Not Found!');
	}
	return option;
};

exports.createCarOption = async data => {
	if (!data.option_name) {
		throw new InternalServerError(['Option name is required!']);
	}

	return carOptionsRepository.createCarOption(data);
};

exports.updateCarOption = async (id, data) => {
	const existingOption = await carOptionsRepository.getCarOptionById(id);
	if (!existingOption) {
		throw new NotFoundError('Car Option is Not Found!');
	}

	return carOptionsRepository.updateCarOption(id, data);
};

exports.deleteCarOptionById = async id => {
	const existingOption = await carOptionsRepository.getCarOptionById(id);
	if (!existingOption) {
		throw new NotFoundError('Car Option is Not Found!');
	}

	return carOptionsRepository.deleteCarOptionById(id);
};
