const express = require("express");
const authorize = require("../middlewares/authorize");
const {
  validateGetCars,
  validateGetCarById,
  validateCreateCar,
  validateUpdateCar,
  validateDeleteCar,
} = require("../middlewares/carsMiddlewares");

const {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
} = require("../controllers/carsControllers");

const router = express.Router();

// Rute untuk GET tanpa middleware authorize (akses untuk semua pengguna terotentikasi)
router
  .route("/")
  .get(validateGetCars, getAllCars)
  .post(validateCreateCar, authorize, createCar); // POST terbatas untuk role_id 1

router
  .route("/:id")
  .get(validateGetCarById, getCarById) // GET terbatas untuk semua pengguna
  .put(validateUpdateCar, authorize, updateCar) // PUT terbatas untuk role_id 1
  .delete(validateDeleteCar, authorize, deleteCar); // DELETE terbatas untuk role_id 1

module.exports = router;
