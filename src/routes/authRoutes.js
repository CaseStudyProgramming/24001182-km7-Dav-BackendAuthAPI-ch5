// src/routes/authRoutes.js

const express = require("express");
const { register, login, getProfile } = require("../controllers/auth");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware.authenticate, getProfile);

module.exports = router;
