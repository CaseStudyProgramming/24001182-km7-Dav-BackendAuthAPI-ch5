//src/repositories/carsRepositories

const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getAllCars = async (
  plate,
  rentPerDay,
  capacity,
  description,
  availableAt,
  available,
  year,
  image
) => {
  let query = {
    include: {
      manufacture: true,
      model: true,
      transmission: true,
      type: true,
      options: {
        include: {
          caroptions: true,
        },
      },
      specs: {
        include: {
          carspecs: true,
        },
      },
    },
  };

  let orQuery = [];

  if (plate) {
    orQuery.push({
      plate: {
        contains: plate,
        mode: "insensitive",
      },
    });
  }
  if (rentPerDay) {
    orQuery.push({
      rentPerDay: {
        contains: rentPerDay,
        mode: "insensitive",
      },
    });
  }
  if (capacity) {
    orQuery.push({
      capacity: {
        contains: capacity,
        mode: "insensitive",
      },
    });
  }
  if (description) {
    orQuery.push({
      description: {
        contains: description,
        mode: "insensitive",
      },
    });
  }
  if (availableAt) {
    orQuery.push({
      availableAt: {
        contains: availableAt,
        mode: "insensitive",
      },
    });
  }
  if (available) {
    orQuery.push({
      available: {
        contains: available,
        mode: "insensitive",
      },
    });
  }
  if (year) {
    orQuery.push({
      year: {
        contains: year,
        mode: "insensitive",
      },
    });
  }
  if (image) {
    orQuery.push({
      image: {
        contains: image,
        mode: "insensitive",
      },
    });
  }
  if (orQuery.length > 0) {
    query.where = {
      ...query.where,
      OR: orQuery,
    };
  }

  const searchedCars = await prisma.cars.findMany(query);
  const serializedCars = JSONBigInt.stringify(searchedCars);
  return JSONBigInt.parse(serializedCars);
};

exports.getCarById = async (id) => {
  const repoCarId = await prisma.cars.findUnique({
    where: {
      id: id,
    },
    include: {
      manufacture: true,
      model: true,
      transmission: true,
      type: true,
      options: {
        include: {
          caroptions: true,
        },
      },
      specs: {
        include: {
          carspecs: true,
        },
      },
    },
  });
  const serializedCarId = JSONBigInt.stringify(repoCarId);
  return JSONBigInt.parse(serializedCarId);
};

exports.createCar = async (carBody) => {
  const createNewCar = await prisma.cars.create({
    data: {
      plate: carBody.plate,
      rentperday: parseInt(carBody.rentperday),
      capacity: parseInt(carBody.capacity),
      description: carBody.description,
      availableat: carBody.availableat,
      available:
        carBody.available === "true"
          ? true
          : carBody.available === "false"
          ? false
          : null,
      year: parseInt(carBody.year),
      transmission_id: parseInt(carBody.transmission_id),
      type_id: parseInt(carBody.type_id),
      manufacture_id: parseInt(carBody.manufacture_id),
      model_id: parseInt(carBody.model_id),
      image: carBody.image,
    },
    include: {
      manufacture: true,
      model: true,
      transmission: true,
      type: true,
      options: {
        include: {
          caroptions: true,
        },
      },
      specs: {
        include: {
          carspecs: true,
        },
      },
    },
  });

  const createNewOptions = await Promise.all(
    (Array.isArray(carBody.option_id)
      ? carBody.option_id
      : [carBody.option_id]
    ).map(async (optionId) => {
      return prisma.options.create({
        data: {
          car_id: createNewCar.id,
          option_id: BigInt(optionId),
        },
      });
    })
  );
  const createNewSpecs = await Promise.all(
    (Array.isArray(carBody.spec_id) ? carBody.spec_id : [carBody.spec_id]).map(
      async (specId) => {
        return prisma.specs.create({
          data: {
            car_id: createNewCar.id,
            spec_id: BigInt(specId),
          },
        });
      }
    )
  );

  const car = {
    ...createNewCar,
    options: createNewOptions,
    specs: createNewSpecs,
  };

  const serializedNewCar = JSONBigInt.stringify(car);
  return JSONBigInt.parse(serializedNewCar);
};

exports.updateCar = async (id, carBody) => {
  const updateCarDetails = await prisma.cars.update({
    where: { id: id },
    data: {
      plate: carBody.plate,
      rentperday: parseInt(carBody.rentperday),
      capacity: parseInt(carBody.capacity),
      description: carBody.description,
      availableat: carBody.availableat,
      available:
        carBody.available === "true"
          ? true
          : carBody.available === "false"
          ? false
          : null,
      year: parseInt(carBody.year),
      transmission_id: parseInt(carBody.transmission_id),
      type_id: parseInt(carBody.type_id),
      manufacture_id: parseInt(carBody.manufacture_id),
      model_id: parseInt(carBody.model_id),
      image: carBody.image,
    },
    include: {
      manufacture: true,
      model: true,
      transmission: true,
      type: true,
      options: {
        include: {
          caroptions: true,
        },
      },
      specs: {
        include: {
          carspecs: true,
        },
      },
    },
  });

  await prisma.options.deleteMany({
    where: { car_id: id },
  });

  await prisma.specs.deleteMany({
    where: { car_id: id },
  });

  const createNewOptions = await Promise.all(
    (Array.isArray(carBody.option_id)
      ? carBody.option_id
      : [carBody.option_id]
    ).map(async (optionId) => {
      return prisma.options.create({
        data: {
          car_id: id,
          option_id: BigInt(optionId),
        },
      });
    })
  );

  const createNewSpecs = await Promise.all(
    (Array.isArray(carBody.spec_id) ? carBody.spec_id : [carBody.spec_id]).map(
      async (specId) => {
        return prisma.specs.create({
          data: {
            car_id: id,
            spec_id: BigInt(specId),
          },
        });
      }
    )
  );

  const updatedCar = {
    ...updateCarDetails,
    options: createNewOptions,
    specs: createNewSpecs,
  };

  const serializedUpdatedCar = JSONBigInt.stringify(updatedCar);
  return JSONBigInt.parse(serializedUpdatedCar);
};

exports.deleteCar = async (carId) => {
  // Delete related options
  await prisma.options.deleteMany({
    where: { car_id: carId },
  });

  // Delete related specs
  await prisma.specs.deleteMany({
    where: { car_id: carId },
  });

  // Delete the car itself
  const deleteCar = await prisma.cars.delete({
    where: { id: carId },
    include: {
      manufacture: true,
      model: true,
      transmission: true,
      type: true,
      options: {
        include: {
          caroptions: true,
        },
      },
      specs: {
        include: {
          carspecs: true,
        },
      },
    },
  });

  // Serialize the result to handle BigInt conversion
  const serializedDeletedCar = JSONBigInt.stringify(deleteCar);
  return JSONBigInt.parse(serializedDeletedCar);
};
