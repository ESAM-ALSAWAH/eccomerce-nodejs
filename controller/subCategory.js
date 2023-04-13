const subCategoryModel = require("../models/subCategory");
const ErrorWithCode = require("../helper/error");
const { response } = require("../helper/response");
const mongoose = require("mongoose");

exports.createSubCategory = async (req, res, next) => {
  const { isAdmin } = req.user;
  const { name, category } = req.body;
  try {
    if (!isAdmin)
      throw new ErrorWithCode("You dont have access to make that", 403);

    const ObjectId = mongoose.Types.ObjectId;
    if (!ObjectId.isValid(category))
      throw new ErrorWithCode("category must be ObjectId", 400);
    const subCategory = new subCategoryModel({
      name,
      category,
    });
    await subCategory
      .save()
      .then(() => {
        response(
          res,
          201,
          `create sub category successfully`,
          subCategory,
          null
        );
      })
      .catch((err) => {
        throw new ErrorWithCode(err);
      });
  } catch (err) {
    next(err);
  }
};

exports.subcategories = async (req, res, next) => {
  try {
    const { page, pagesize } = req.headers;
    const subcategories = await subCategoryModel
      .find()
      .limit(pagesize ?? 10)
      .skip(page > 0 && (page - 1) * pagesize);
    response(res, 200, "get subcategories success", subcategories);
  } catch (err) {
    next(err);
  }
};
exports.subcategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subCategory = await subCategoryModel.findById(id);
    if (!subCategory) throw new ErrorWithCode("subCategory not found", 404);
    response(res, 200, "get subCategory success", subCategory);
  } catch (err) {
    next(err);
  }
};

exports.deleteSubCategory = async (req, res, next) => {
  try {
    const { isAdmin } = req.user;
    const { id } = req.params;
    if (!isAdmin)
      throw new ErrorWithCode(
        `You dont have access to delete subcategory`,
        403
      );
    await subCategoryModel
      .findOneAndDelete({ _id: id })
      .then((deletedDocument) => {
        if (deletedDocument)
          response(
            res,
            200,
            `Delete subCategory successfully`,
            deletedDocument
          );
        else response(res, 404, `Not found this id`, null);
      })
      .catch((err) => {
        throw new ErrorWithCode(err);
      });
  } catch (err) {
    next(err);
  }
};

exports.updateSubCategory = async (req, res, next) => {
  try {
    const { isAdmin } = req.user;
    const { id } = req.params;
    const { name, category } = req.body;
    const ObjectId = mongoose.Types.ObjectId;
    if (!isAdmin)
      throw new ErrorWithCode(
        `You dont have access to update subcategory`,
        403
      );
    if (!ObjectId.isValid(category))
      throw new ErrorWithCode("category must be ObjectId", 400);
    await subCategoryModel
      .findOneAndUpdate(
        { _id: id },
        {
          $set: {
            name,
            category,
          },
        }
      )
      .then((updatedDocumnet) => {
        if (updatedDocumnet)
          response(
            res,
            200,
            `updated subCategory successfully`,
            updatedDocumnet
          );
        else response(res, 404, `Not found this id`, null);
      })
      .catch((err) => {
        throw new ErrorWithCode(err);
      });
  } catch (err) {
    next(err);
  }
};
