// src/routes/index.js

const express = require("express");
const routesType = require("./routeType");
const routesManufacture = require("./routeManufacture");
const routesModel = require("./routeModel");
const routesCars = require("./carsRoutes");
const routesCarSpecs = require("./carspecsRoutes");
const routesSpecs = require("./specsRoutes");
const routeOptions = require("./routeOptions");
const routeCarOptions = require("./routeCarOptions");
const routeTransmission = require("./routeTransmission");
const authMiddleware = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorize"); // Tambahkan ini
const authController = require("../controllers/auth");

const router = express.Router();

// Route untuk autentikasi
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

// Middleware untuk melindungi route berikutnya (akses hanya dengan token yang valid)
router.use(authMiddleware.authenticate);

router.use("/type", authorize, routesType);
router.use("/manufacture", authorize, routesManufacture);
router.use("/model", authorize, routesModel);

// Terapkan middleware authorize hanya untuk rute CRUD
router.use("/cars", routesCars); // Hanya pengguna dengan role_id 1 yang bisa mengakses rute ini
router.use("/carspecs", authorize, routesCarSpecs); // Hanya pengguna dengan role_id 1 yang bisa mengakses rute ini
router.use("/specs", authorize, routesSpecs); // Hanya pengguna dengan role_id 1 yang bisa mengakses rute ini

router.use("/options", authorize, routeOptions); // Hanya pengguna dengan role_id 1 yang bisa mengakses rute ini
router.use("/caroptions", authorize, routeCarOptions); // Hanya pengguna dengan role_id 1 yang bisa mengakses rute ini
router.use("/transmission", authorize, routeTransmission); // Hanya pengguna dengan role_id 1 yang bisa mengakses rute ini

module.exports = router;
