const { validationResult } = require("express-validator");
const { response } = require("../helper/response");
const winston = require("winston");
const jwt = require("jsonwebtoken");
exports.logger = (req, res, next) => {
  winston.info(`${req.method} ${req.originalUrl}`);
  next();
};

/* middleware that handle any throw error */
exports.handleError = (err, req, res, next) => {
  const status = err.status || 500;
  winston.error(err.message);
  response(res, status, err.message, null, err.message);
};

// define middleware function to handle validation errors with express-validator
exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return response(res, 400, "bad request", null, errors.array());
  }
  next();
};

// Middleware function to verify JWT token
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Missing token" });
  }

  jwt.verify(token, process.env.SECRET_key, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = decoded;
    next();
  });
};
