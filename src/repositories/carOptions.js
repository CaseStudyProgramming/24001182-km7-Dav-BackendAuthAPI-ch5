const { PrismaClient } = require('@prisma/client');
const JSONBigInt = require('json-bigint');

const prisma = new PrismaClient();

exports.getCarOptions = async option_name => {
	let query = {};

	if (option_name) {
		query.where = {
			option_name: {
				contains: option_name,
				mode: 'insensitive',
			},
		};
	}

	const searchedOptions = await prisma.caroptions.findMany(query);

	const serializedOptions = JSONBigInt.stringify(searchedOptions);
	return JSONBigInt.parse(serializedOptions);
};

exports.getCarOptionById = async id => {
	const option = await prisma.caroptions.findUnique({
		where: {
			id: id,
		},
	});

	const serializedOption = JSONBigInt.stringify(option);
	return JSONBigInt.parse(serializedOption);
};

exports.createCarOption = async data => {
	const newOption = await prisma.caroptions.create({
		data,
	});

	const serializedOption = JSONBigInt.stringify(newOption);
	return JSONBigInt.parse(serializedOption);
};

exports.updateCarOption = async (id, data) => {
	const updatedOption = await prisma.caroptions.update({
		where: { id },
		data,
	});

	const serializedOption = JSONBigInt.stringify(updatedOption);
	return JSONBigInt.parse(serializedOption);
};

exports.deleteCarOptionById = async id => {
	const deletedOption = await prisma.caroptions.delete({
		where: { id },
	});

	const serializedOption = JSONBigInt.stringify(deletedOption);
	return JSONBigInt.parse(serializedOption);
};
