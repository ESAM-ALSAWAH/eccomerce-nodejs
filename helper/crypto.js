const crypto = require("crypto");

exports.hashing_password = (password) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return { hash, salt };
};

exports.compare_password = (oldPassword, salt, hash) => {
  const oldhash = crypto
    .pbkdf2Sync(oldPassword, salt, 1000, 64, "sha512")
    .toString("hex");
  const isMatch = oldhash === hash;
  return isMatch;
};
