const { body } = require("express-validator");

exports.loginValidation = [
  body("email").notEmpty().isEmail(),
  body("password").notEmpty(),
];
exports.registerValidation = [
  body("fullName").notEmpty().isLength({ min: 3, max: 15 }),
  body("email").notEmpty().isEmail(),
  body("password").notEmpty().isLength({ min: 8 }),
];
exports.createCategoryValidation = [body("name").notEmpty()];
exports.createSubCategoryValidation = [
  body("name").notEmpty(),
  body("category").notEmpty(),
];
