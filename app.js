const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const db = require("./config/db");
const { logger, handleError } = require("./middleware/middleware");
db();

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger);
app.use("/api/v1", require("./routes/index"));
app.use(handleError);
app.listen(process.env.PORT || 4000, () => {
  console.log("Server is running on port 4000");
});
