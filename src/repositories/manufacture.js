const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getManufactures = async (manufacture_name) => {
  let query = {};

  if (manufacture_name) {
    query.where = {
      manufacture_name: {
        contains: manufacture_name,
        mode: "insensitive",
      },
    };
  }

  const searchedManufacture = await prisma.manufacture.findMany(query);
  const serializedManufacture = JSONBigInt.stringify(searchedManufacture);
  return JSONBigInt.parse(serializedManufacture);
};

exports.getManufactureById = async (id) => {
  const manufacture = await prisma.manufacture.findUnique({
    where: { id: id },
  });

  const serializedManufacture = JSONBigInt.stringify(manufacture);
  return JSONBigInt.parse(serializedManufacture);
};

exports.createManufacture = async (data) => {
  const newManufacture = await prisma.manufacture.create({ data });
  const serializedManufacture = JSONBigInt.stringify(newManufacture);
  return JSONBigInt.parse(serializedManufacture);
};

exports.updateManufacture = async (id, data) => {
  const updatedManufacture = await prisma.manufacture.update({
    where: { id },
    data: {
      manufacture_name: data.manufacture_name,
    },
  });

  const serializedManufacture = JSONBigInt.stringify(updatedManufacture);
  return JSONBigInt.parse(serializedManufacture);
};

exports.deleteManufactureById = async (id) => {
  const deletedManufacture = await prisma.manufacture.delete({
    where: { id },
  });

  const serializedManufacture = JSONBigInt.stringify(deletedManufacture);
  return JSONBigInt.parse(serializedManufacture);
};
