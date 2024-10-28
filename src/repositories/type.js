const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getTypes = async (type_option) => {
  let query = {};

  if (type_option) {
    query.where = {
      type_option: {
        contains: type_option,
        mode: "insensitive",
      },
    };
  }

  const searchedType = await prisma.type.findMany(query);
  const serializedType = JSONBigInt.stringify(searchedType);
  return JSONBigInt.parse(serializedType);
};

exports.getTypeById = async (id) => {
  const type = await prisma.type.findUnique({
    where: { id: id },
  });

  const serializedType = JSONBigInt.stringify(type);
  return JSONBigInt.parse(serializedType);
};

exports.createType = async (data) => {
  const newType = await prisma.type.create({ data });
  const serializedType = JSONBigInt.stringify(newType);
  return JSONBigInt.parse(serializedType);
};

exports.updateType = async (id, data) => {
  const updatedType = await prisma.type.update({
    where: { id },
    data: {
      type_option: data.type_option,
    },
  });

  const serializedType = JSONBigInt.stringify(updatedType);
  return JSONBigInt.parse(serializedType);
};

exports.deleteTypeById = async (id) => {
  const deletedType = await prisma.type.delete({
    where: { id },
  });

  const serializedType = JSONBigInt.stringify(deletedType);
  return JSONBigInt.parse(serializedType);
};
