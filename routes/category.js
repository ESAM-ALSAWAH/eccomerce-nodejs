const express = require("express");
const {
  createCategory,
  categories,
  deleteCategory,
  updateCategory,
  category,
} = require("../controller/category");

const {
  verifyToken,
  handleValidationErrors,
} = require("../middleware/middleware");

const { createCategoryValidation } = require("../validation/schema");


const router = express.Router();

router.get("/:id", category);
router.get("/", categories);
router.delete("/:id", verifyToken, deleteCategory);
router.post(
  "/",
  verifyToken,
  createCategoryValidation,
  handleValidationErrors,
  createCategory
);
router.patch(
  "/:id",
  verifyToken,
  createCategoryValidation,
  handleValidationErrors,
  updateCategory
);
module.exports = router;
