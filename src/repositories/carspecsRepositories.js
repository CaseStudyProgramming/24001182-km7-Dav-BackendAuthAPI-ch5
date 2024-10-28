const {PrismaClient} = require('@prisma/client');
const { query } = require('express');
const JSONBigInt = require('json-bigint');

const prisma = new PrismaClient();

exports.getAllCarSpecs = async (spec_name) => {
    let orQuery = [];
    if (spec_name) {
        orQuery.push({
            spec_name: {
                contains: spec_name,
                mode: 'insensitive'
            }
        })
    }
    if (orQuery.length > 0) {
        query.where = {
            ...query.where,
            OR: orQuery
        }
    }

    const searchedCarSpecs = await prisma.carspecs.findMany(query);
    const serializedCarSpecs = JSONBigInt.stringify(searchedCarSpecs);
    return JSONBigInt.parse(serializedCarSpecs);
}

exports.getCarSpecsById = async (id) => {
    const repoCarSpecsId = await prisma.carspecs.findUnique({
        where: {
            id: id
        }
    });
    const serializedCarSpecsId = JSONBigInt.stringify(repoCarSpecsId);
    return JSONBigInt.parse(serializedCarSpecsId);
}

exports.createCarSpecs = async (carspecsBody) => {
    const createNewCarSpecs = await prisma.carspecs.create({
        data: carspecsBody
    });
    const serializedNewCarSpecs = JSONBigInt.stringify(createNewCarSpecs);
    return JSONBigInt.parse(serializedNewCarSpecs);
}

exports.deleteCarSpecs = async (id) => {
    const deleteCarSpecs = await prisma.carspecs.delete({
        where: {
            id: id
        }
    });
    const serializedDeleteCarSpecs = JSONBigInt.stringify(deleteCarSpecs);
    return JSONBigInt.parse(serializedDeleteCarSpecs);
}

exports.updateCarSpecs = async (id, carspecsBody) => {
    const updateCarSpecs = await prisma.carspecs.update({
        where: { id: id },
        data: carspecsBody
    });
    const serializedUpdateCarSpecs = JSONBigInt.stringify(updateCarSpecs);
    return JSONBigInt.parse(serializedUpdateCarSpecs);
}

