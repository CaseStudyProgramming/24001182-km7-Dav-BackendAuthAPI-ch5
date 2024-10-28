const express = require('express');

const {
    validateGetCarSpecs,
    validateGetCarSpecsById,
    validateCreateCarSpecs,
    validateDeleteCarSpecs,
    validateUpdateCarSpecs
} = require('../middlewares/carspecsMiddlewares');

const {
    getAllCarSpecs,
    getCarSpecsById,
    createCarSpecs,
    deleteCarSpecs,
    updateCarSpecs
} = require('../controllers/carspecsControllers');

const router = express.Router();

router
    .route("/")
    .get(validateGetCarSpecs, getAllCarSpecs)
    .post(validateCreateCarSpecs, createCarSpecs);

router
    .route("/:id")
    .get(validateGetCarSpecsById, getCarSpecsById)
    .delete(validateDeleteCarSpecs, deleteCarSpecs)
    .put(validateUpdateCarSpecs, updateCarSpecs);

module.exports = router;
