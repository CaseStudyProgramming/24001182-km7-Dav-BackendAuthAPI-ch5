const { PrismaClient } = require('@prisma/client');
const JSONBigInt = require('json-bigint');

const prisma = new PrismaClient();

exports.getOptions = async (option_id, car_id) => {
	let query = {};

	if (option_id || car_id) {
		query.where = {
			...(option_id && { option_id }),
			...(car_id && { car_id }),
		};
	}

	const searchedOptions = await prisma.options.findMany(query);

	const serializedOptions = JSONBigInt.stringify(searchedOptions);
	return JSONBigInt.parse(serializedOptions);
};
