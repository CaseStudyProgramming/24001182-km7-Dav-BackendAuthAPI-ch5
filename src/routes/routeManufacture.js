const express = require("express");
const {
  validateGetManufactures,
  validateGetManufactureById,
  validateCreateManufacture,
  validateUpdateManufacture,
  validateDeleteManufactureById,
} = require("../middlewares/manufacture");

const {
  getManufactures,
  getManufactureById,
  createManufacture,
  updateManufacture,
  deleteManufactureById,
} = require("../controllers/manufacture");

const router = express.Router();

router
  .route("/")
  .get(validateGetManufactures, getManufactures)
  .post(validateCreateManufacture, createManufacture);

router
  .route("/:id")
  .get(validateGetManufactureById, getManufactureById)
  .put(validateUpdateManufacture, updateManufacture)
  .delete(validateDeleteManufactureById, deleteManufactureById);

module.exports = router;
