const express = require('express');
const { validateGetOptions } = require('../middlewares/options');
const { getOptions } = require('../controllers/options');

const router = express.Router();

router.route('/').get(validateGetOptions, getOptions);

module.exports = router;
