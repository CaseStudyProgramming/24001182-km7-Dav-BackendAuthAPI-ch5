const {PrismaClient} = require('@prisma/client');
const { query } = require('express');
const JSONBigInt = require('json-bigint');

const prisma = new PrismaClient();

exports.getAllSpecs = async (spec_id, car_id) => {
    let whereCondition = {};

    if (spec_id) {
        whereCondition.spec_id = {
            equals: parseInt(spec_id, 10)
        };
    }

    if (car_id) {
        whereCondition.car_id = {
            equals: parseInt(car_id, 10)
        };
    }

    const query = {
        where: whereCondition
    };

    const searchedSpecs = await prisma.specs.findMany(query);
    const serializedSpecs = JSONBigInt.stringify(searchedSpecs);
    return JSONBigInt.parse(serializedSpecs);
}
