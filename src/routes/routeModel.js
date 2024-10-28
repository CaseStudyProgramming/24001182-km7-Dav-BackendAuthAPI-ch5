const express = require("express");
const {
  validateGetModels,
  validateGetModelById,
  validateCreateModel,
  validateUpdateModel,
  validateDeleteModelById,
} = require("../middlewares/model");

const {
  getModels,
  getModelById,
  createModel,
  updateModel,
  deleteModelById,
} = require("../controllers/model");

const router = express.Router();

router
  .route("/")
  .get(validateGetModels, getModels)
  .post(validateCreateModel, createModel);

router
  .route("/:id")
  .get(validateGetModelById, getModelById)
  .put(validateUpdateModel, updateModel)
  .delete(validateDeleteModelById, deleteModelById);

module.exports = router;
