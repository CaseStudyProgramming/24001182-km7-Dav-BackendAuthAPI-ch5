const express = require('express');
const { validateGetCarOptions, validateGetCarOptionById, validateCreateCarOption, validateUpdateCarOption, validateDeleteCarOptionById } = require('../middlewares/carOptions');
const { getCarOptions, getCarOptionById, createCarOption, updateCarOption, deleteCarOptionById } = require('../controllers/carOptions');

const router = express.Router();

router.route('/').get(validateGetCarOptions, getCarOptions).post(validateCreateCarOption, createCarOption);

router.route('/:id').get(validateGetCarOptionById, getCarOptionById).put(validateUpdateCarOption, updateCarOption).delete(validateDeleteCarOptionById, deleteCarOptionById);

module.exports = router;
