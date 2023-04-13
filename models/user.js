const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },

  password: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  birth: {
    type: Date,
    default: null,
  },
  address: {
    type: String,
    default: null,
  },
  phone: {
    type: String,
    default: null,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other", null],
    default: null,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("User", UserSchema);
