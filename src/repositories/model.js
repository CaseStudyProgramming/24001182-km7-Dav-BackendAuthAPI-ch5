const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getModels = async (model_name) => {
  let query = {};

  if (model_name) {
    query.where = {
      model_name: {
        contains: model_name,
        mode: "insensitive",
      },
    };
  }

  const searchedModels = await prisma.model.findMany(query);
  const serializedModels = JSONBigInt.stringify(searchedModels);
  return JSONBigInt.parse(serializedModels);
};

exports.getModelById = async (id) => {
  const model = await prisma.model.findUnique({
    where: { id: id },
  });

  const serializedModel = JSONBigInt.stringify(model);
  return JSONBigInt.parse(serializedModel);
};

exports.createModel = async (data) => {
  const newModel = await prisma.model.create({ data });
  const serializedModel = JSONBigInt.stringify(newModel);
  return JSONBigInt.parse(serializedModel);
};

exports.updateModel = async (id, data) => {
  const updatedModel = await prisma.model.update({
    where: { id },
    data: {
      model_name: data.model_name,
    },
  });

  const serializedModel = JSONBigInt.stringify(updatedModel);
  return JSONBigInt.parse(serializedModel);
};

exports.deleteModelById = async (id) => {
  const deletedModel = await prisma.model.delete({
    where: { id },
  });

  const serializedModel = JSONBigInt.stringify(deletedModel);
  return JSONBigInt.parse(serializedModel);
};
