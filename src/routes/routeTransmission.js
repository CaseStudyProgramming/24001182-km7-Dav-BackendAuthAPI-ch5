const express = require('express');
const { validateGetTransmissions, validateGetTransmissionById, validateDeleteTransmissionById, validateCreateTransmission, validateUpdateTransmission } = require('../middlewares/transmission');
const { getTransmissions, getTransmissionById, deleteTransmissionById, createTransmission, updateTransmission } = require('../controllers/transmission');

const router = express.Router();

// Rute untuk mendapatkan semua transmisi dan membuat transmisi baru
router.route('/').get(validateGetTransmissions, getTransmissions).post(validateCreateTransmission, createTransmission);

// Rute untuk mendapatkan, memperbarui, dan menghapus transmisi berdasarkan ID
router.route('/:id').get(validateGetTransmissionById, getTransmissionById).put(validateUpdateTransmission, updateTransmission).delete(validateDeleteTransmissionById, deleteTransmissionById);

module.exports = router;
