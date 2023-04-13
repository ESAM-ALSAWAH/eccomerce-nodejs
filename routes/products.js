const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "products",
  });
});
router.get("/one", (req, res, next) => {
  res.status(200).json({
    message: "one product",
  });
});
module.exports = router;
