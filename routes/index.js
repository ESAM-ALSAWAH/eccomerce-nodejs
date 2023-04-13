const express = require("express");
const router = express.Router();
const { handleValidationErrors } = require("../middleware/middleware");

router.use("/products", require("./products"));
router.use("/category", require("./category"));
router.use("/subcategory", require("./sub-category"));

router.use("/user", handleValidationErrors, require("./user"));
router.use("/auth", handleValidationErrors, require("./auth"));

module.exports = router;
