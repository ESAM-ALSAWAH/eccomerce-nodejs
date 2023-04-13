const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
CategorySchema.index({
  name: 1,
});
module.exports = mongoose.model("Category", CategorySchema);
