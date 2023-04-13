const jwt = require("jsonwebtoken");
const ErrorWithCode = require("../helper/error");
const { hashing_password, compare_password } = require("../helper/crypto");
const { response } = require("../helper/response");
const UserModel = require("../models/user");
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne(
      { email },
      { password: 1, email: 1, isAdmin: 1 }
    );
    if (!user) throw new ErrorWithCode(`Email is wrong , try again `, 401);
    else if (
      !compare_password(password, user.password.salt, user.password.hash)
    )
      throw new ErrorWithCode("password is wrong!", 401);
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
    response(res, 200, "login suuceess", { email: user.email, token });
  } catch (err) {
    next(err);
  }
};
exports.register = async (req, res, next) => {
  try {
    const { password, email, fullName } = req.body;
    const { hash, salt } = hashing_password(password);
    const newUser = new UserModel({
      email,
      fullName,
      password: {
        hash,
        salt,
      },
    });
    await newUser
      .save()
      .then((data) => {
        const { email, fullName } = data;
        response(res, 201, `Register successfully`, { email, fullName }, null);
      })
      .catch((err) => {
        if (err.code === 11000 && err.keyPattern.email)
          throw new ErrorWithCode("Email address is already registered", 400);
        else throw new ErrorWithCode(err);
      });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    response(res, 200, `logout successfully`);
  } catch (err) {
    next(err);
  }
};
