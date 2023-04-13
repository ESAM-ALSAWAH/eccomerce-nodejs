const express = require("express");
const {
  createSubCategory,
  deleteSubCategory,
  subcategories,
  subcategory,
  updateSubCategory,
} = require("../controller/subCategory");
const {
  verifyToken,
  handleValidationErrors,
} = require("../middleware/middleware");
const { createSubCategoryValidation } = require("../validation/schema");
const router = express.Router();

router.get("/:id", subcategory);
router.get("/", subcategories);
router.delete("/:id", verifyToken, deleteSubCategory);
router.post(
  "/",
  verifyToken,
  createSubCategoryValidation,
  handleValidationErrors,
  createSubCategory
);
router.patch(
  "/:id",
  verifyToken,
  createSubCategoryValidation,
  handleValidationErrors,
  updateSubCategory
);
module.exports = router;
