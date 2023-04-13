const categoryModel = require("../models/category");
const ErrorWithCode = require("../helper/error");
const { response } = require("../helper/response");

exports.categories = async (req, res, next) => {
  try {
    const { page, pagesize } = req.headers;
    const categories = await categoryModel
      .find()
      .limit(pagesize ?? 10)
      .skip(page > 0 && (page - 1) * pagesize);
    response(res, 200, "get categories success", categories);
  } catch (err) {
    next(err);
  }
};
exports.category = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findById(id);
    if (!category) throw new ErrorWithCode("Category not found", 404);
    response(res, 200, "get category success", category);
  } catch (err) {
    next(err);
  }
};

exports.createCategory = async (req, res, next) => {
  const { isAdmin } = req.user;
  const { name } = req.body;
  try {
    if (!isAdmin)
      throw new ErrorWithCode("You dont have access to make that", 403);
    const category = new categoryModel({
      name,
    });
    await category
      .save()
      .then(() => {
        response(res, 201, `create category successfully`, category, null);
      })
      .catch((err) => {
        throw new ErrorWithCode(err);
      });
  } catch (err) {
    next(err);
  }
};
exports.deleteCategory = async (req, res, next) => {
  try {
    const { isAdmin } = req.user;
    const { id } = req.params;
    if (!isAdmin)
      throw new ErrorWithCode(`You dont have access to delete category`, 403);
    await categoryModel
      .findOneAndDelete({ _id: id })
      .then((deletedDocument) => {
        if (deletedDocument)
          response(res, 200, `Delete category successfully`, deletedDocument);
        else response(res, 404, `Not found this id`, null);
      })
      .catch((err) => {
        throw new ErrorWithCode(err);
      });
  } catch (err) {
    next(err);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const { isAdmin } = req.user;
    const { id } = req.params;
    const { name } = req.body;
    if (!isAdmin)
      throw new ErrorWithCode(`You dont have access to update category`, 403);
    await categoryModel
      .findOneAndUpdate(
        { _id: id },
        {
          $set: {
            name,
          },
        }
      )
      .then((updatedDocumnet) => {
        if (updatedDocumnet)
          response(res, 200, `updated category successfully`, updatedDocumnet);
        else response(res, 404, `Not found this id`, null);
      })
      .catch((err) => {
        throw new ErrorWithCode(err);
      });
  } catch (err) {
    next(err);
  }
};
