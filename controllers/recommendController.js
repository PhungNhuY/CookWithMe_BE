const RecommendModel = require('../models/recommendModel');
const UserModel = require('../models/userModel');
const PostModel = require('../models/postModel');
const CategoryModel = require('../models/categoryModel');
const { msgEnum } = require('../enums/message.enum');
const { statusEnum } = require('../enums/status.enum');
const { codeEnum } = require('../enums/status-code.enum');

class RecommendController {
    async getRecommend(req, res, next){
        console.log("---RecommendController.getRecommend");
        try {
            let posts = await PostModel.aggregate([
                [ { $sample: { size: 5 } } ]
            ]);

            await UserModel.populate(posts, {path:"author"});
            await CategoryModel.populate(posts, {path:"categories"});

            return res.status(codeEnum.SUCCESS).json({
                status: statusEnum.SUCCESS,
                data: posts
            });
        } catch (error) {
            next(error);
        }
        
    }
    createRecommend(req, res, next){
        console.log("---RecommendController.createRecommend");
        
    }
    updateRecommend(req, res, next){
        console.log("---RecommendController.updateRecommend");
        
    }
    deleteRecommend(req, res, next){
        console.log("---RecommendController.deleteRecommend");
    }
}

module.exports = new RecommendController();