const express = require("express");
const { me } = require("../controller/user");
const { verifyToken } = require("../middleware/middleware");
const router = express.Router();

router.get("/me", verifyToken, me);

module.exports = router;
