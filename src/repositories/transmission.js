const { PrismaClient } = require('@prisma/client');
const JSONBigInt = require('json-bigint');

const prisma = new PrismaClient();

exports.getTransmissions = async transmission_option => {
	// Define query here
	let query = {};

	// It will generate the query
	if (transmission_option) {
		query.where = {
			transmission_option: {
				contains: transmission_option, // Memfilter berdasarkan transmission_option
				mode: 'insensitive', // Pencarian tidak sensitif terhadap huruf besar/kecil
			},
		};
	}

	// Find by query
	const searchedTransmission = await prisma.transmission.findMany(query);

	// Convert BigInt fields to string for safe serialization
	const serializedTransmission = JSONBigInt.stringify(searchedTransmission);
	return JSONBigInt.parse(serializedTransmission);
};

exports.getTransmissionById = async id => {
	// Mencari transmisi berdasarkan ID
	const transmission = await prisma.transmission.findUnique({
		where: {
			id: id,
		},
		// Hapus include cars
	});

	// Convert BigInt fields to string for safe serialization
	const serializedTransmission = JSONBigInt.stringify(transmission);
	return JSONBigInt.parse(serializedTransmission);
};

exports.createTransmission = async data => {
	const newTransmission = await prisma.transmission.create({
		data,
		// Hapus include cars
	});

	// Convert BigInt fields to string for safe serialization
	const serializedTransmission = JSONBigInt.stringify(newTransmission);
	return JSONBigInt.parse(serializedTransmission);
};

exports.updateTransmission = async (id, data) => {
	const updatedTransmission = await prisma.transmission.update({
		where: { id },
		data: {
			transmission_option: data.transmission_option, // Pastikan ini sesuai dengan data yang ingin diperbarui
			// Hapus bagian cars
		},
		// Hapus include cars
	});

	// Convert BigInt fields to string for safe serialization
	const serializedTransmission = JSONBigInt.stringify(updatedTransmission);
	return JSONBigInt.parse(serializedTransmission);
};

exports.deleteTransmissionById = async id => {
	const deletedTransmission = await prisma.transmission.delete({
		where: { id },
		// Hapus include cars
	});

	// Convert BigInt fields to string for safe serialization
	const serializedTransmission = JSONBigInt.stringify(deletedTransmission);
	return JSONBigInt.parse(serializedTransmission);
};
