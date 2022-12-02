const CategoryModel = require('../models/categoryModel');
const { codeEnum } = require('../enums/status-code.enum');
const { msgEnum } = require('../enums/message.enum');
const { statusEnum } = require('../enums/status.enum');


class CategoryController {

    // GET
    getCategory(req, res, next) {

    }

    // POST
    async createCategory(req, res, next) {
        try {
            const category = await CategoryModel.create(req.body);
            res.status(codeEnum.CREATED).json({ status: statusEnum.SUCCESS, data: category });
        } catch (error) {
            next(error);
        }
    }

    // PUT
    updateCategory(req, res, next) {

    }

    // DELETE
    deleteCategory(req, res, next) {

    }
}

module.exports = new CategoryController();