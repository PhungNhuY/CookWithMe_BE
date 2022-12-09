const RecommendModel = require('../models/recommendModel');
const PostModel = require('../models/postModel');
const { msgEnum } = require('../enums/message.enum');
const { statusEnum } = require('../enums/status.enum');
const { codeEnum } = require('../enums/status-code.enum');

class RecommendController {
    async getRecommend(req, res, next){
        try {
            let posts = await PostModel.aggregate([
                [ { $sample: { size: 5 } } ]
            ])

            res.status(codeEnum.SUCCESS).json({
                status: statusEnum.SUCCESS,
                data: posts
            })
        } catch (error) {
            next(error)
        }
        
    }
    createRecommend(req, res, next){
        console.log("---RecommendController.deletePost");
        
    }
    updateRecommend(req, res, next){
        console.log("---RecommendController.deletePost");
        
    }
    deleteRecommend(req, res, next){
        console.log("---RecommendController.deletePost");
        
    }
}

module.exports = new RecommendController();