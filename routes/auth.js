const express = require("express");
const { verifyToken } = require("../middleware/middleware");
const { login, register, logout } = require("../controller/auth");
const { registerValidation, loginValidation } = require("../validation/schema");
const { handleValidationErrors } = require("../middleware/middleware");

const router = express.Router();

router.post("/login", loginValidation, handleValidationErrors, login);
router.post("/register", registerValidation, handleValidationErrors, register);

router.get("/logout", verifyToken, logout);
module.exports = router;
