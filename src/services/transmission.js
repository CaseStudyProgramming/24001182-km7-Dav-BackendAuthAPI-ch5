const transmissionRepository = require('../repositories/transmission');
const { NotFoundError, InternalServerError } = require('../utils/request');

exports.getTransmissions = async transmission_option => {
	return transmissionRepository.getTransmissions(transmission_option);
};

exports.getTransmissionById = async id => {
	const transmission = await transmissionRepository.getTransmissionById(id);
	if (!transmission) {
		throw new NotFoundError('Transmission is Not Found!');
	}

	return transmission;
};

exports.createTransmission = async data => {
	// Validasi data jika diperlukan
	if (!data.transmission_option) {
		throw new InternalServerError(['Transmission option is required!']);
	}

	// Create the data
	return transmissionRepository.createTransmission(data);
};

exports.updateTransmission = async (id, data) => {
	// Cek apakah transmisi ada
	const existingTransmission = await transmissionRepository.getTransmissionById(id);
	if (!existingTransmission) {
		throw new NotFoundError('Transmission is Not Found!');
	}

	// Validasi data jika diperlukan
	if (!data.transmission_option) {
		throw new InternalServerError(['Transmission option is required!']);
	}

	// Menggabungkan data yang ada dengan data baru
	data = {
		...existingTransmission, // existing Transmission
		...data,
	};

	// Update transmisi
	const updatedTransmission = await transmissionRepository.updateTransmission(id, data);
	if (!updatedTransmission) {
		throw new InternalServerError(['Failed to update transmission!']);
	}

	return updatedTransmission;
};

exports.deleteTransmissionById = async id => {
	// Cek apakah transmisi ada
	const existingTransmission = await transmissionRepository.getTransmissionById(id);
	if (!existingTransmission) {
		throw new NotFoundError('Transmission is Not Found!');
	}

	return transmissionRepository.deleteTransmissionById(id);
};
