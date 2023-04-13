const { response } = require("../helper/response");
const userModel = require("../models/user");
exports.me = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await userModel.findById(id, { password: 0 });
  
    if (!user) {
      response(res, 404, `user doesn't found`, null);
    }
    response(res, 200, "get user details success", user);
  } catch (err) {
    next(err);
  }
};
