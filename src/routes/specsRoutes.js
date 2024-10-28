const express = require('express');

const {
    validateGetSpecs,
} = require('../middlewares/specsMiddlewares');

const {
    getAllSpecs,
    // createSpecs
} = require('../controllers/specsControllers');

const router = express.Router();

router
    .route("/")
    .get(validateGetSpecs, getAllSpecs);

router
    .route("/")

module.exports = router;
