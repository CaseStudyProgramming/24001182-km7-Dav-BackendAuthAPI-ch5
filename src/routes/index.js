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
const authorize = require("../middlewares/authorize");
const authController = require("../controllers/auth");
const authRoutes = require("./authRoutes");

const router = express.Router();

// Route untuk autentikasi
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.use("/auth", authRoutes);
// Middleware untuk melindungi route berikutnya (akses hanya dengan token yang valid)
router.use(authMiddleware.authenticate);

router.use("/type", authorize, routesType);
router.use("/manufacture", authorize, routesManufacture);
router.use("/model", authorize, routesModel);

router.use("/cars", routesCars);
router.use("/carspecs", authorize, routesCarSpecs);
router.use("/specs", authorize, routesSpecs);

router.use("/options", authorize, routeOptions);
router.use("/caroptions", authorize, routeCarOptions);
router.use("/transmission", authorize, routeTransmission);

module.exports = router;
