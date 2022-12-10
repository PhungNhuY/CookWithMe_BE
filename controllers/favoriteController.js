const FavoriteModel = require('../models/favoriteModel');
const { msgEnum } = require('../enums/message.enum');
const { statusEnum } = require('../enums/status.enum');
const { codeEnum } = require('../enums/status-code.enum');
const UserModel = require('../models/userModel');
const CategoryModel = require('../models/categoryModel');

class FavoriteController {
    // POST
    async add(req, res, next){
        console.log("--- favoriteController.add");
        try {
            const user = req.user_id;
            const post = req.body.post;

            // validate input data
            if (!post) {
                return res.status(codeEnum.BAD_REQUEST).json({
                    status: statusEnum.FAIL,
                    message: msgEnum.MISSING_FAVORITE_DATA,
                });
            }

            const ex = await FavoriteModel.findOne({user, post});
            if (!ex) {
                const favorite = await FavoriteModel.create({ user, post });
                return res.status(codeEnum.CREATED).json({
                    status: statusEnum.SUCCESS,
                    data: favorite,
                });
            }
            else{
                return res.status(codeEnum.CREATED).json({
                    status: statusEnum.SUCCESS,
                    data: ex,
                });
            }
        } catch (error) {
            next(error);
        }
    }

    // POST
    async delete(req, res, next){
        console.log("--- favoriteController.delete");
        try {
            const user = req.user_id;
            const post = req.body.post;

            await FavoriteModel.findOneAndDelete({user, post});
            return res.status(codeEnum.NO_CONTENT).json({});
        } catch (error) {
            next(error);
        }
    }

    // GET
    async getList(req, res, next){
        console.log("--- favoriteController.getList");
        try {
            let posts = await FavoriteModel.find({user:req.user_id}).select("post -_id").populate("post");
            await UserModel.populate(posts, {path:"post.author"});
            await CategoryModel.populate(posts, {path:"post.categories"});
            let posts2 = [];
            posts.forEach((el) => {
                posts2.push(el.post);
            });
            return res.status(codeEnum.SUCCESS).json({
                status: statusEnum.SUCCESS,
                data: posts2,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new FavoriteController();