const CategoryModel = require('../models/categoryModel');
const { codeEnum } = require('../enums/status-code.enum');
const { msgEnum } = require('../enums/message.enum');
const { statusEnum } = require('../enums/status.enum');


class CategoryController {

    // GET
    async getCategory(req, res, next) {
        console.log("---CategoryController.getCategory");
        try {
            const category = await CategoryModel.findById(req.params.id)
            if (!category) {
                return res.status(codeEnum.NOT_FOUND).json({
                    status: statusEnum.FAIL,
                    message: msgEnum.NOT_FOUND,
                });
            }
            return res.status(codeEnum.SUCCESS).json({
                status: statusEnum.SUCCESS,
                data: category,
            });
        } catch (error) {
            next(error);
        }
    }

    // GET
    async getListCategoy(req, res, next) {
        console.log("---CategoryController.getListCategoy");
        try {
            let query = CategoryModel.find();

            // pagination
            const page = req.query.page || 1;
            const limit = req.query.perpage || 100;
            const skip = (page - 1) * limit;
            query = query.skip(skip).limit(limit);

            // fields
            if (req.query.fields) {
                const fields = req.query.fields.split(",").join(" ");
                query = query.select(fields);
            }

            //sort
            if (req.query.sort) {
                const sortBy = req.query.sort.split(",").join(" ");
                query = query.sort(sortBy);
            } else {
                // query = query.sort("-createdAt");
                query = query.sort("name");
            }

            const listCategories = await query;

            // count
            const count = await CategoryModel.count();
            const pages = Math.ceil(count / limit);

            return res.status(codeEnum.SUCCESS).json({
                status: statusEnum.SUCCESS,
                pages,
                data: listCategories
            });
        } catch (error) {
            next(error);
        }
    }

    // POST
    async createCategory(req, res, next) {
        console.log("---CategoryController.createCategory");
        try {
            const category = await CategoryModel.create(req.body);
            res.status(codeEnum.CREATED).json({ status: statusEnum.SUCCESS, data: category });
        } catch (error) {
            next(error);
        }
    }

    // PUT
    async updateCategory(req, res, next) {
        console.log("---CategoryController.updateCategory");
        try {
            const category = await CategoryModel.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            })

            if (!category) {
                return res.status(codeEnum.NOT_FOUND).json({
                    status: statusEnum.FAIL,
                    message: msgEnum.NOT_FOUND,
                });
            }

            return res.status(codeEnum.SUCCESS).json({
                status: statusEnum.SUCCESS,
                data: category,
            });
        } catch (error) {
            next(error);
        }
    }

    // DELETE
    async deleteCategory(req, res, next) {
        console.log("---CategoryController.deleteCategory");
        try {
            const category = await CategoryModel.findByIdAndDelete(req.params.id);
            if (!category) {
                return res.status(codeEnum.NOT_FOUND).json({
                    status: statusEnum.FAIL,
                    message: msgEnum.NOT_FOUND,
                });
            }
            return res.status(codeEnum.NO_CONTENT).json({
                status: statusEnum.SUCCESS,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CategoryController();