const express = require("express");
const {
  validateGetTypes,
  validateGetTypeById,
  validateCreateType,
  validateUpdateType,
  validateDeleteTypeById,
} = require("../middlewares/type");

const {
  getTypes,
  getTypeById,
  createType,
  updateType,
  deleteTypeById,
} = require("../controllers/type");

const router = express.Router();

router
  .route("/")
  .get(validateGetTypes, getTypes)
  .post(validateCreateType, createType);

router
  .route("/:id")
  .get(validateGetTypeById, getTypeById)
  .put(validateUpdateType, updateType)
  .delete(validateDeleteTypeById, deleteTypeById);

module.exports = router;
